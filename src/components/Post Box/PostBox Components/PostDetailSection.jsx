import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";

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
import { useAuth, usePost, useUser } from "../../../contexts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRelativeTime } from "../../../utils/GetRelativeTime";

const PostDetailSection = ({
  onOpen,
  post,
  bookmarked,
  setClicked,
  clicked,
}) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const { handlePostLike, handlePostUnLike } = usePost();
  const [isExpanded, setIsExpanded] = useState(false);

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
            <Box as={FaRegComment} sx={postIconStyle} title="Comment" />
            <Box as={IoPaperPlaneOutline} sx={IconHoverStyle} title="Share" />
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
              {likedBy.length - 1} others
            </Text>
          </Flex>
        ) : (
          likedBy.length !== 0 && (
            <Text onClick={onOpen} cursor={"pointer"}>
              {likedBy.length} likes
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
          {content.length > 56 && (
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

        <Flex>
          <Text fontSize={"sm"} color={"#717171e0"} cursor={"pointer"}>
            View All Comments
          </Text>
        </Flex>
        <Text fontSize="xs" color={"#717171e0"}>
          {getRelativeTime(createdAt)}
        </Text>
      </Flex>

      <Flex py="1" borderTop="1px solid gray" alignItems={"center"}>
        <Box
          as={BsEmojiSunglasses}
          fontSize={"1.8rem"}
          cursor="pointer"
          ml="2"
          title="Emoji"
        />

        <Input
          placeholder="Add a comment..."
          border={"none"}
          flex="1"
          mr="2"
          _focus={{ outline: "none", boxShadow: "none", border: "none" }}
        />
        <Button fontSize={"1rem"} variant={"link-button"} size="sm">
          Post
        </Button>
      </Flex>
    </>
  );
};

export default PostDetailSection;
