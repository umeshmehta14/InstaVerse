import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../../contexts";
import {
  AiFillHeart,
  AiOutlineHeart,
  BsEmojiSunglasses,
  FaBookmark,
  FaRegBookmark,
  IoPaperPlaneOutline,
} from "../../../utils/Icons";
import {
  IconHoverStyle,
  friendLikeUserStyle,
  iconPostStyles,
  postIconStyle,
  userBoldStyle,
} from "../../../styles/PostBoxStyles";
import { UserListModal } from "../../../components";

const CommentFooter = ({ post }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const {
    _id,
    likes: { likedBy },
  } = post;

  const { handlePostLike, handlePostUnLike, HandleCreateComment } = usePost();
  const { currentUser } = useAuth();
  const {
    handleBookmark,
    handleRemoveBookmark,
    userState: { userBookmarks },
  } = useUser();

  const [commentValue, setCommentValue] = useState("");

  const bookmarked = userBookmarks?.includes(_id);
  const userLike = likedBy?.find(
    ({ username }) => username === currentUser?.username
  );

  const friendLike = currentUser?.following?.find(({ username }) =>
    likedBy?.some((likeUser) => likeUser?.username === username)
  );

  const handleCommentPost = () => {
    HandleCreateComment(commentValue, _id);
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
          <HStack justifyContent={"space-between"} w={"20%"}>
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
              as={IoPaperPlaneOutline}
              sx={IconHoverStyle}
              onClick={() => navigator.clipboard.writeText("hello")}
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
              onClick={() => navigate(`/profile/${friendLike?.username}`)}
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
      </Flex>
      <Flex
        py="1"
        borderTop="1px solid gray"
        borderBottom="1px solid gray"
        alignItems="center"
        w="100%"
        display={{ base: "none", md: "flex" }}
        bg={colorMode === "dark" ? "black.900" : "white.500"}
      >
        <Box
          as={BsEmojiSunglasses}
          fontSize="1.8rem"
          cursor="pointer"
          ml="2"
          title="Emoji"
        />

        <Input
          placeholder="Add a comment..."
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          border={"none"}
          flex="1"
          mr="2"
          _focus={{
            outline: "none",
            boxShadow: "none",
            border: "none",
          }}
        />
        <Button
          fontSize={"1rem"}
          variant={"link-button"}
          size="sm"
          onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
          color={commentValue === "" ? "gray" : null}
        >
          Post
        </Button>
      </Flex>
      {isOpen && (
        <UserListModal
          onClose={onClose}
          isOpen={isOpen}
          users={likedBy}
          heading={"Liked By"}
        />
      )}
    </>
  );
};

export default CommentFooter;
