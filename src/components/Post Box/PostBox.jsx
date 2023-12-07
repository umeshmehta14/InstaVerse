import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  ScaleFade,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, useUser } from "../../contexts";
import { UserListModal } from "../index";
import {
  bookmarkPopup,
  postThreeDot,
  mainPostBoxStyles,
  postNavStyles,
} from "../../styles/PostBoxStyles";
import { BsThreeDots } from "../../utils/Icons";
import PostDetailSection from "./PostBox Components/PostDetailSection";
import { SET_DEFAULT_TAB, fallBackImg } from "../../utils/Constants";
import { InfoPopup } from "../index";

export const PostBox = ({ post }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const infoPopupDisclosure = useDisclosure();

  const {
    userState: { userBookmarks },
    userDispatch,
    handleFollow,
  } = useUser();

  const { currentUser } = useAuth();

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

  const postFollow = currentUser.following.find(
    (user) => user.username === username
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
  }, [bookmarked, userBookmarks]);

  return (
    <Box
      {...mainPostBoxStyles}
      bg={colorMode === "light" ? "white.500" : "black.900"}
      boxShadow={colorMode === "light" ? "1px 1px 8px #8080805e" : ""}
    >
      <Flex {...postNavStyles}>
        <Flex alignItems={"center"} gap={2}>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            title={username}
            onClick={() => navigate(`/profile/${username}`)}
          >
            <Avatar size="sm" src={avatarURL} />
            <Text ml="2" fontWeight="medium">
              {username}
            </Text>
          </Flex>
          {!postFollow && !(currentUser.username === username) && (
            <Button
              alignItems={"center"}
              variant={"link-button"}
              justifyContent="flex-start"
              onClick={() => handleFollow(username)}
            >
              Follow
            </Button>
          )}
        </Flex>
        <Button {...postThreeDot} onClick={infoPopupDisclosure.onOpen}>
          <Box as={BsThreeDots} cursor={"pointer"} />
          {infoPopupDisclosure.isOpen && (
            <InfoPopup
              setClicked={setClicked}
              clicked={clicked}
              isOpen={infoPopupDisclosure.isOpen}
              onClose={infoPopupDisclosure.onClose}
              post={post}
            />
          )}
        </Button>
      </Flex>

      <Box pos={"relative"}>
        <Image
          src={mediaUrl}
          fallbackSrc={fallBackImg}
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
              <Button
                variant={"link-button"}
                fontSize={"0.8rem"}
                p="0"
                onClick={() => {
                  userDispatch({ type: SET_DEFAULT_TAB, payload: 2 });
                  navigate(`/profile/${currentUser.username}`);
                }}
              >
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
        setClicked={setClicked}
        clicked={clicked}
      />

      {isOpen && (
        <UserListModal
          onClose={onClose}
          isOpen={isOpen}
          users={likedBy}
          heading={"Liked By"}
        />
      )}
    </Box>
  );
};
