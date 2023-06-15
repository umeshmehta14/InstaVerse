import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  ScaleFade,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuth, usePost, useUser } from "../../contexts";
import LikesUserModal from "./PostBox Components/LikesUserModal";
import {
  bookmarkPopup,
  iconPostStyles,
  mainPostBoxStyles,
  postIconStyle,
} from "../../styles/PostBoxStyles";
import {
  AiOutlineHeart,
  AiFillHeart,
  FaRegComment,
  IoPaperPlaneOutline,
  BsThreeDots,
  FaBookmark,
  FaRegBookmark,
  BsEmojiSunglasses,
} from "../../utils/Icons";
import { useEffect } from "react";

export const PostBox = ({ post }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const { handlePostLike, handlePostUnLike } = usePost();
  const { currentUser } = useAuth();
  const {
    handleBookmark,
    handleRemoveBookmark,
    handleSingleUser,
    userState: { userBookmarks },
  } = useUser();
  const navigate = useNavigate();
  const [showSavedPostBox, setShowSavedPostBox] = useState(false);
  const [clicked, setClicked] = useState(false);

  const {
    _id,
    username,
    mediaUrl,
    avatarURL,
    comments,
    content,
    createdAt,
    likes: { likedBy },
  } = post;

  const bookmarked = userBookmarks?.includes(_id);
  const friendLike = currentUser.following.find(({ username }) =>
    likedBy.some((likeUser) => likeUser.username === username)
  );

  const userLike = likedBy.find(
    ({ username }) => username === currentUser.username
  );

  const handleBookmarkClick = () => {
    if (bookmarked && clicked) {
      setShowSavedPostBox(true);
      setClicked(!clicked);
      setTimeout(() => {
        setShowSavedPostBox(false);
      }, 2000);
    }
  };

  useEffect(() => {
    handleBookmarkClick();
  }, [bookmarked]);

  return (
    <Box
      {...mainPostBoxStyles}
      bg={colorMode === "light" ? "white.500" : "black.900"}
      boxShadow={colorMode === "light" ? "1px 1px 8px #8080805e" : ""}
    >
      <Flex
        px="3"
        py="1"
        align="center"
        justifyContent={"space-between"}
        borderBottom={"0.5px solid #e0e0e0"}
      >
        <Flex
          alignItems={"center"}
          cursor={"pointer"}
          title={username}
          onClick={() => handleSingleUser(username)}
        >
          <Avatar
            size="sm"
            name={username}
            src={
              avatarURL ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
            }
          />
          <Text ml="2" fontWeight="semibold">
            {username}
          </Text>
        </Flex>
        <Popover>
          <PopoverTrigger>
            <Button
              fontSize={"1.5rem"}
              pr={0}
              bg={"transparent"}
              borderRadius={"40%"}
              _hover={{ color: "gray", bg: "transparent" }}
            >
              <Box as={BsThreeDots} cursor={"pointer"} />
            </Button>
          </PopoverTrigger>
          <PopoverContent w={"fit-content"}>
            <PopoverBody>
              <Button>Edit</Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      <Box pos={"relative"}>
        <Image
          src={mediaUrl}
          fallbackSrc="https://tse4.mm.bing.net/th?id=OIP.y0vjVCLBEYW5ANsy2YHhGgHaCe&pid=Api&P=0&h=180"
          w={"100%"}
          maxH={"585px"}
        />
        {showSavedPostBox && (
          <ScaleFade in={showSavedPostBox} initialScale={1}>
            <Flex
              bg={colorMode === "dark" ? "black.900" : "white.500"}
              {...bookmarkPopup}
            >
              <Text>Post has been saved</Text>
              <Button variant={"link-button"} fontSize={"0.8rem"} p="0">
                View your saved posts
              </Button>
            </Flex>
          </ScaleFade>
        )}
      </Box>
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
                cursor="pointer"
                _hover={{ color: "gray" }}
                title="Like"
                onClick={() => handlePostLike(_id)}
              />
            )}
            <Box as={FaRegComment} {...postIconStyle} title="Comment" />
            <Box
              as={IoPaperPlaneOutline}
              cursor="pointer"
              _hover={{ color: "gray" }}
              title="Share"
            />
          </HStack>
          <HStack>
            {bookmarked ? (
              <Box
                as={FaBookmark}
                {...postIconStyle}
                title="Remove"
                onClick={() => handleRemoveBookmark(_id)}
              />
            ) : (
              <Box
                as={FaRegBookmark}
                {...postIconStyle}
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
              ml="1"
              fontWeight="semibold"
              align={"center"}
              gap={"1"}
              onClick={() => navigate(`/profile/${friendLike.username}`)}
              cursor={"pointer"}
            >
              <Avatar
                size="2xs"
                title={friendLike.username}
                src={
                  friendLike?.avatarURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                }
              />
              {friendLike?.username}
            </Flex>
            <Text mx={"1"}>and</Text>
            <Text
              fontWeight="semibold"
              ref={btnRef}
              onClick={onOpen}
              cursor={"pointer"}
            >
              {likedBy.length - 1} others
            </Text>
          </Flex>
        ) : (
          <Text ref={btnRef} onClick={onOpen} cursor={"pointer"}>
            {likedBy.length} likes
          </Text>
        )}

        <Flex fontSize={"sm"} gap="0.5rem">
          <Text
            fontWeight={"semibold"}
            cursor={"pointer"}
            onClick={() => navigate(`/profile/${username}`)}
          >
            {username}
          </Text>{" "}
          {content}
        </Flex>

        <Flex>
          <Text fontSize={"sm"} color={"#717171e0"} cursor={"pointer"}>
            View All Comments
          </Text>
        </Flex>
        <Text fontSize="xs" color={"#717171e0"}>
          {` ${new Date(createdAt)
            .toDateString()
            .split(" ")
            .slice(1, 4)
            .join(" ")}`}
        </Text>
      </Flex>

      <Flex py="1" borderTop="1px solid gray" alignItems={"center"}>
        <Box
          as={BsEmojiSunglasses}
          fontSize={"1.8rem"}
          cursor="pointer"
          title="Emoji"
          ml="2"
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
      <LikesUserModal
        btnRef={btnRef}
        onClose={onClose}
        isOpen={isOpen}
        likedBy={likedBy}
      />
    </Box>
  );
};
