import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

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
import { commentInput, emojiPickerButton } from "../../../styles/GlobalStyles";
import { commentFooterInputMain } from "../../../styles/SinglePostStyle";

export const CommentFooter = ({ post }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const {
    _id,
    likes: { likedBy },
  } = post;

  const { handlePostLike, handlePostUnLike, handleCreateComment, handleShare } =
    usePost();
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
    handleCreateComment(commentValue, _id);
    setCommentValue("");
  };
  return (
    <>
      <Divider display={{ base: "none", md: "flex" }} />
      <Flex {...iconPostStyles} display={{ base: "none", md: "flex" }}>
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
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...commentFooterInputMain}
      >
        <Popover>
          <PopoverTrigger>
            <Box as={BsEmojiSunglasses} {...emojiPickerButton} title="Emoji" />
          </PopoverTrigger>
          <PopoverContent bottom={"27rem"} bg={"transparent"}>
            <PopoverBody p={0}>
              <Picker
                data={data}
                onEmojiSelect={(emoji) =>
                  setCommentValue(commentValue + emoji.native)
                }
                theme={colorMode}
                title="Pick an Emoji"
                emoji=""
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
