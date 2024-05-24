import React, { useState, useEffect, useRef } from "react";
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

import { RotatingLoader, UserListModal } from "../index";
import {
  bookmarkPopup,
  postThreeDot,
  mainPostBoxStyles,
  postNavStyles,
} from "../../styles/PostBoxStyles";
import { BsThreeDots } from "../../utils/Icons";
import PostDetailSection from "./PostBox Components/PostDetailSection";
import { InfoPopup } from "../index";
import HeartPopup from "./PostBox Components/HeartPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFollowUnfollowUser,
  updateTab,
} from "../../pages/Post Feed/userSlice";
import { handleLikes } from "../../pages/Post Feed/postSlice";

export const PostBox = ({ post }) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const infoPopupDisclosure = useDisclosure();

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.authentication);
  const { isLoading, bookmarks } = useSelector((state) => state.user);

  const [showSavedPostBox, setShowSavedPostBox] = useState(false);
  const [clicked, setClicked] = useState(false);

  const {
    _id,
    owner: { username, avatar },
    url,
    likes,
  } = post;

  const bookmarked = bookmarks?.find((post) => post?._id === _id);

  const postFollow = currentUser.following.find(
    (user) => user.username === username
  );

  const userLike = likes.find(
    ({ username }) => username === currentUser.username
  );

  const [doubleTap, setDoubleTap] = useState(false);
  const lastTapRef = useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_THRESHOLD = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
      setDoubleTap(true);
      if (!userLike) {
        dispatch(handleLikes({ _id }));
      }
      setTimeout(() => {
        setDoubleTap(false);
      }, 800);
    } else {
      setDoubleTap(false);
    }

    lastTapRef.current = now;
  };

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
  }, [bookmarked, bookmarks]);

  return (
    <Box
      {...mainPostBoxStyles}
      bg={colorMode === "light" ? "white.500" : "black.900"}
    >
      <Flex {...postNavStyles}>
        <Flex alignItems={"center"} gap={2}>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            title={username}
            onClick={() => navigate(`/profile/${username}`)}
          >
            <Avatar size="sm" src={avatar?.url} />
            <Text ml="2" fontWeight="medium">
              {username}
            </Text>
          </Flex>
          {!postFollow && !(currentUser?.username === username) && (
            <Button
              variant={"link-button"}
              size="sm"
              p={0}
              onClick={() =>
                dispatch(
                  handleFollowUnfollowUser({
                    _id,
                    follow: true,
                    username,
                  })
                )
              }
            >
              {isLoading ? <RotatingLoader w="20" sw={"7"} /> : "Follow"}
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
          src={url}
          w={"100%"}
          maxH={"585px"}
          minH={"400px"}
          border={{ base: "none", md: "0.5px solid #838383" }}
          borderRadius={{ base: "0", md: "6px" }}
          onClick={() => handleDoubleTap()}
        />
        {doubleTap && <HeartPopup />}
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
                  dispatch(updateTab(2));
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
        userLike={userLike}
      />

      {isOpen && (
        <UserListModal onClose={onClose} isOpen={isOpen} heading={"Liked By"} />
      )}
    </Box>
  );
};
