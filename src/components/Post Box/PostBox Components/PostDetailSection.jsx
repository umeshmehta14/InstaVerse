import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  commentInput,
  emojiPickerButtonNew,
  userNameStyle,
} from "../../../styles/GlobalStyles";
import {
  IconHoverStyle,
  friendLikeUserStyle,
  iconPostStyles,
  postIconStyle,
  userBoldStyle,
} from "../../../styles/PostBoxStyles";
import {
  AiOutlineHeart,
  AiFillHeart,
  FaRegComment,
  IoPaperPlaneOutline,
  FaBookmark,
  FaRegBookmark,
  BsEmojiSunglasses,
} from "../../../utils/Icons";
import { useDispatch, useSelector } from "react-redux";
import { handleLikes } from "../../../pages/Post Feed/postSlice";
import {
  addUserBookmark,
  getPostLikeUsers,
  removeUserBookmark,
} from "../../../pages/Post Feed/userSlice";
import {
  handleShare,
  renderCaptionWithHashtags,
  truncateTextWithHTML,
} from "../../../utils/Utils";

const PostDetailSection = ({
  onOpen,
  post,
  bookmarked,
  setClicked,
  clicked,
  userLike,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();

  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const { currentUser } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const {
    _id,
    owner: { username },
    totalComments,
    caption,
    likes,
  } = post;

  const friendLike = currentUser.following.find(({ username }) =>
    likes.some((likeUser) => likeUser?.username === username)
  );

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentPost = () => {
    handleCreateComment(commentValue, _id);
    setCommentValue("");
  };

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(true);
    dispatch(handleLikes({ _id }));
    setTimeout(() => {
      setIsLiked(false);
    }, 1000);
  };

  return (
    <>
      <Flex {...iconPostStyles}>
        <Flex
          fontSize={"1.7rem"}
          color={colorMode === "light" ? "black" : "white"}
          justifyContent={"space-between"}
        >
          <HStack justifyContent={"space-between"} w={"30%"}>
            {userLike ? (
              <Box
                as={AiFillHeart}
                cursor="pointer"
                color={"red"}
                title="Unlike"
                onClick={() => {
                  dispatch(handleLikes({ _id, unlike: true }));
                }}
              />
            ) : (
              <Box
                as={AiOutlineHeart}
                {...IconHoverStyle}
                title="Like"
                onClick={() => handleLike()}
                className={isLiked ? "like-animation" : ""}
              />
            )}
            <Box
              as={FaRegComment}
              sx={postIconStyle}
              title="Comment"
              onClick={() =>
                navigate(`/post/${_id}`, { state: { from: location } })
              }
            />
            <Box
              as={IoPaperPlaneOutline}
              sx={IconHoverStyle}
              onClick={() => handleShare(_id)}
              title="Share"
            />
          </HStack>
          <HStack>
            {bookmarked ? (
              <Box
                as={FaBookmark}
                sx={postIconStyle}
                title="Remove"
                onClick={() => dispatch(removeUserBookmark({ _id }))}
              />
            ) : (
              <Box
                as={FaRegBookmark}
                sx={postIconStyle}
                title="Save"
                onClick={() => {
                  dispatch(addUserBookmark({ _id }));
                  setClicked(!clicked);
                }}
              />
            )}
          </HStack>
        </Flex>
        {friendLike ? (
          <Flex fontSize={"sm"} align={"center"}>
            <Text>Liked by </Text>
            <Flex
              sx={friendLikeUserStyle}
              onClick={() => navigate(`/profile/${friendLike.username}`)}
              align={"center"}
              {...userNameStyle}
            >
              <Avatar
                size="2xs"
                title={friendLike?.username}
                src={friendLike?.avatar?.url}
              />
              {friendLike?.username}
            </Flex>
            {likes?.length !== 1 && (
              <>
                <Text mx={"1"}>and</Text>
                <Text
                  sx={userBoldStyle}
                  onClick={() => {
                    dispatch(getPostLikeUsers({ _id }));
                    onOpen();
                  }}
                >
                  {likes?.length - 1} others
                </Text>
              </>
            )}
          </Flex>
        ) : (
          likes?.length !== 0 && (
            <Text
              onClick={() => {
                dispatch(getPostLikeUsers({ _id }));
                onOpen();
              }}
              cursor={"pointer"}
            >
              {likes?.length} likes
            </Text>
          )
        )}

        <Box
          fontSize={"sm"}
          w={"100%"}
          overflow={isExpanded ? "visible" : "hidden"}
          whiteSpace="break-spaces"
        >
          <Text
            as="span"
            {...userNameStyle}
            onClick={() => navigate(`/profile/${username}`)}
            mr={"0.3rem"}
          >
            {username}
          </Text>
          <Text
            as="span"
            fontWeight={100}
            fontSize={"0.95rem"}
            display="inline"
            whiteSpace={isExpanded ? "break-spaces" : "normal"}
          >
            {isExpanded
              ? renderCaptionWithHashtags(caption)
              : renderCaptionWithHashtags(truncateTextWithHTML(caption))}
          </Text>
          {caption?.length > 50 && (
            <Button
              variant={"link-button"}
              fontSize={"0.8rem"}
              p="0"
              color={"gray"}
              onClick={toggleExpanded}
              ml={"0.3rem"}
            >
              {isExpanded ? "Show less" : "more"}
            </Button>
          )}
        </Box>

        <Text
          fontSize={"sm"}
          color={"#717171e0"}
          cursor={"pointer"}
          onClick={() =>
            navigate(`/post/${_id}`, { state: { from: location } })
          }
        >
          {totalComments > 0 &&
            `View ${totalComments > 1 ? "all" : ""} ${totalComments}  comment${
              totalComments > 1 ? "s" : ""
            }`}
        </Text>
      </Flex>

      <Flex p={{ base: "0 12px", md: 0 }} alignItems={"center"}>
        <Popover>
          <PopoverTrigger>
            <Button {...emojiPickerButtonNew}>
              <BsEmojiSunglasses />
            </Button>
          </PopoverTrigger>
          <PopoverContent bg={"transparent"}>
            <PopoverBody p={0}>
              <Picker
                data={data}
                onEmojiSelect={(emoji) =>
                  setCommentValue(commentValue + emoji.native)
                }
                theme={colorMode}
                title="Pick an Emoji"
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Add a comment..."
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          {...commentInput}
        />
        <Button
          fontSize={"0.8rem"}
          variant={"link-button"}
          size="sm"
          onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
          visibility={commentValue.length === 0 ? "hidden" : "visible"}
        >
          Post
        </Button>
      </Flex>
    </>
  );
};

export default PostDetailSection;
