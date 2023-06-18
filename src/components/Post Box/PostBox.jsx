import React, { useRef, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  ScaleFade,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useUser } from "../../contexts";
import { UserListModal } from "../index";
import {
  bookmarkPopup,
  postThreeDot,
  mainPostBoxStyles,
  postNavStyles,
} from "../../styles/PostBoxStyles";
import { BsThreeDots } from "../../utils/Icons";
import PostDetailSection from "./PostBox Components/PostDetailSection";

export const PostBox = ({ post }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const {
    handleSingleUser,
    userState: { userBookmarks },
  } = useUser();

  const [showSavedPostBox, setShowSavedPostBox] = useState(false);
  const [clicked, setClicked] = useState(false);

  const {
    _id,
    username,
    mediaUrl,
    avatarURL,
    likes: { likedBy },
  } = post;

  const bookmarked = userBookmarks?.includes(_id);

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
      <Flex {...postNavStyles}>
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
              {...postThreeDot}
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
          minH={"400px"}
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
      <PostDetailSection
        onOpen={onOpen}
        bookmarked={bookmarked}
        post={post}
        btnRef={btnRef}
        setClicked={setClicked}
        clicked={clicked}
      />
      <UserListModal
        btnRef={btnRef}
        onClose={onClose}
        isOpen={isOpen}
        users={likedBy}
        heading={"Liked By"}
      />
    </Box>
  );
};
