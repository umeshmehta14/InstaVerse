import React, { useCallback, useState } from "react";
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
  likeHeartStyle,
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
  getSearchedUsers,
  removeUserBookmark,
  updateSearchedUsers,
  updateSearchValue,
} from "../../../pages/Post Feed/userSlice";
import {
  debounce,
  handleShare,
  renderCaptionWithHashtags,
  truncateTextWithHTML,
} from "../../../utils/Utils";
import { commentLoaderStyle } from "../../../styles/SinglePostStyle";
import { RotatingLoader } from "../../Loader/RotatingLoader";
import { addCommentToPost } from "../../../pages/Single Post/commentSlice";
import { UserMentionList } from "../../UserMention List/UserMentionList";

const PostDetailSection = ({
  onOpen,
  post,
  bookmarked,
  setClicked,
  clicked,
  userLike,
  singlePost,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();

  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const { currentUser } = useSelector((state) => state.authentication);
  const { commentLoader } = useSelector((state) => state.comment);
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
    if (!commentLoader) {
      dispatch(addCommentToPost({ _id, text: commentValue })).then(() =>
        setCommentValue("")
      );
    }
  };

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleLike = () => {
    setIsLiked(true);
    dispatch(handleLikes({ _id, singlePost }));
    setTimeout(() => {
      setIsLiked(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCommentValue(value);

    const match = value.match(/@(\w*)$/);
    if (match && match[1]) {
      const username = match[1];
      setMatchIndex(match.index);
      setShowTagBox(true);
      dispatch(updateSearchValue(username));
      debouncedFetchData(username);
    } else {
      setShowTagBox(false);
      setMatchIndex(null);
      dispatch(updateSearchValue(""));
      dispatch(updateSearchedUsers());
    }
  };

  const handleUserClick = (username) => {
    const newValue = commentValue.slice(0, matchIndex) + `@${username} `;
    setCommentValue(newValue);
    setShowTagBox(false);
    setMatchIndex(null);
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
                {...likeHeartStyle}
                title="Unlike"
                onClick={() => {
                  dispatch(handleLikes({ _id, unlike: true, singlePost }));
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
              onClick={() => handleShare(_id, "post")}
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

        {caption?.length !== 0 && (
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
        )}

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

      <Flex
        p={{ base: "0 12px", md: 0 }}
        alignItems={"center"}
        pos={"relative"}
      >
        {showTagBox && <UserMentionList handleUserClick={handleUserClick} />}
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

        <Box pos={"relative"} width={"100%"}>
          <Input
            placeholder="Add a comment..."
            value={commentValue}
            onChange={handleInputChange}
            disabled={commentLoader}
            {...commentInput}
            px={0}
          />
          {commentLoader && commentValue && (
            <Box {...commentLoaderStyle}>
              <RotatingLoader w={"40"} sw={"3"} />
            </Box>
          )}
        </Box>
        <Button
          fontSize={"1rem"}
          variant={"link-button"}
          size="sm"
          onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
          color={commentValue === "" ? "gray" : null}
          disabled={commentLoader || commentValue === ""}
          _disabled={{ color: "gray.400", cursor: "default" }}
          _hover={
            commentLoader || commentValue === ""
              ? { color: "gray", cursor: "default" }
              : {}
          }
          visibility={commentValue.length === 0 ? "hidden" : "visible"}
        >
          Post
        </Button>
      </Flex>
    </>
  );
};

export default PostDetailSection;
