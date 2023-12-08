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

import { useAuth, usePost, useUser } from "../../../contexts";
import { getRelativeTime } from "../../../utils/Utils";
import { commentInput, emojiPickerButton } from "../../../styles/GlobalStyles";
import {
  IconHoverStyle,
  friendLikeUserStyle,
  iconPostStyles,
  postContent,
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

const PostDetailSection = ({
  onOpen,
  post,
  bookmarked,
  setClicked,
  clicked,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();

  const { handlePostLike, handlePostUnLike, handleCreateComment, handleShare } =
    usePost();
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const { currentUser } = useAuth();
  const { handleBookmark, handleRemoveBookmark } = useUser();

  const {
    _id,
    username,
    comments,
    content,
    createdAt,
    likes: { likedBy },
  } = post;

  const userLike = likedBy.find(
    ({ username }) => username === currentUser.username
  );

  const friendLike = currentUser.following.find(({ username }) =>
    likedBy.some((likeUser) => likeUser.username === username)
  );

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentPost = () => {
    handleCreateComment(commentValue, _id);
    setCommentValue("");
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
                onClick={() => handlePostUnLike(_id)}
              />
            ) : (
              <Box
                as={AiOutlineHeart}
                {...IconHoverStyle}
                title="Like"
                onClick={() => handlePostLike(_id)}
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
                onClick={() => handleRemoveBookmark(_id)}
              />
            ) : (
              <Box
                as={FaRegBookmark}
                sx={postIconStyle}
                title="Save"
                onClick={() => {
                  handleBookmark(_id);
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
            >
              <Avatar
                size="2xs"
                title={friendLike?.username}
                src={friendLike?.avatarURL}
              />
              {friendLike?.username}
            </Flex>
            <Text mx={"1"}>and</Text>
            <Text sx={userBoldStyle} onClick={onOpen}>
              {likedBy?.length - 1} others
            </Text>
          </Flex>
        ) : (
          likedBy?.length !== 0 && (
            <Text onClick={onOpen} cursor={"pointer"}>
              {likedBy?.length} likes
            </Text>
          )
        )}

        <Flex fontSize={"sm"} flexWrap="wrap">
          <Flex gap={1} w="100%">
            <Text
              {...userBoldStyle}
              onClick={() => navigate(`/profile/${username}`)}
            >
              {username}
            </Text>
            <Text
              {...postContent}
              overflow={isExpanded ? "unset" : "hidden"}
              whiteSpace={isExpanded ? "unset" : "nowrap"}
            >
              {content}
            </Text>
          </Flex>
          {content?.length > 56 && (
            <Button
              variant={"link-button"}
              fontSize={"0.8rem"}
              p="0"
              color={"gray"}
              onClick={toggleExpanded}
            >
              {isExpanded ? "Show less" : "Show more"}
            </Button>
          )}
        </Flex>

        <Text
          fontSize={"sm"}
          color={"#717171e0"}
          cursor={"pointer"}
          onClick={() =>
            navigate(`/post/${_id}`, { state: { from: location } })
          }
        >
          {comments?.length > 0 &&
            `View ${comments?.length > 1 ? "all" : ""} ${
              comments?.length
            }  comment${comments?.length > 1 ? "s" : ""}`}
        </Text>
        <Text fontSize="xs" color={"#717171e0"}>
          {getRelativeTime(createdAt)}
        </Text>
      </Flex>

      <Flex p={{ base: "0 12px", md: 0 }} alignItems={"center"}>
        <Popover>
          <PopoverTrigger>
            <Button
              background="transparent"
              fontSize={"1.1rem"}
              minW={"30px"}
              justifyContent="flex-start"
              p="0"
              color={"gray"}
              _hover={{ background: "transparent", color: "#464646" }}
            >
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
