import React, { useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
  Divider,
  Text,
  VStack,
  Flex,
  Avatar,
  useDisclosure,
  Button,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineArrowLeft } from "../../../utils/Icons";
import { SearchSkeleton } from "../../index";
import { handleFollowUnfollowUser } from "../../../pages/Post Feed/userSlice";
import { UnfollowModal } from "../../Unfollow Modal/UnfollowModal";
import { getRelativeTime } from "../../../utils/Utils";
import { RotatingLoader } from "../../Loader/RotatingLoader";
import { userNameStyle } from "../../../styles/GlobalStyles";

export const Notifications = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const { loadingUsers } = useSelector((state) => state.user);
  const { currentUser } = useSelector((state) => state.authentication);
  const { notifications, notificationLoader } = useSelector(
    (state) => state.post
  );
  const navigate = useNavigate();
  const [unfollowUser, setUnfollowUser] = useState({});
  const dispatch = useDispatch();

  const unfollowModalDisclosure = useDisclosure();

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={{ base: "full", md: "sm" }}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          borderRight={"0.5px solid gray"}
        >
          <DrawerCloseButton display={{ base: "none", md: "inline-block" }} />
          <DrawerHeader
            display={"flex"}
            justifyContent={"space-between"}
            w={"75%"}
          >
            <Box
              as={AiOutlineArrowLeft}
              fontSize={"1.8rem"}
              onClick={() => onClose()}
              display={{ base: "inline-block", md: "none" }}
            />
            <Text>Notifications</Text>
          </DrawerHeader>
          <Divider />

          <DrawerBody>
            {notificationLoader ? (
              <SearchSkeleton />
            ) : (
              <VStack maxW={"100%"}>
                {notifications?.map(
                  ({ type, actionBy, createdAt, post, comment }) => {
                    const { _id, username, avatar } = actionBy;
                    const isFollowing = currentUser?.following?.some(
                      (user) => user?._id === _id
                    );
                    const isLoading = loadingUsers.includes(_id);
                    if (type === "follow") {
                      return (
                        <Flex
                          key={_id}
                          gap={"2"}
                          my={"2"}
                          cursor={"pointer"}
                          w={"100%"}
                          title={username}
                          onClick={() => {
                            navigate(`/profile/${username}`);
                            onClose();
                          }}
                          _hover={
                            colorMode === "dark" ? { bg: "#323232ad" } : ""
                          }
                        >
                          <Flex alignItems={"center"} gap={"2"}>
                            <Avatar size="md" src={avatar?.url} />
                          </Flex>
                          <Flex
                            gap={{ base: "0.5rem", md: "3rem" }}
                            alignItems={"center"}
                          >
                            <Flex flexWrap={"wrap"}>
                              <Text wordBreak={"break-word"}>
                                <Text
                                  as="span"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/profile/${username}`);
                                    onClose();
                                  }}
                                  {...userNameStyle}
                                >
                                  {username}
                                </Text>
                                <Text as="span" ml={"0.2rem"}>
                                  started following you.
                                </Text>
                                <Text
                                  fontSize={"14px"}
                                  color={"#717171e0"}
                                  display={"inline"}
                                  ml={"0.2rem"}
                                  wordBreak={"break-word"}
                                >
                                  {getRelativeTime(createdAt)}
                                </Text>
                              </Text>
                            </Flex>
                            {isFollowing ? (
                              <Button
                                variant={"following-button"}
                                title="Unfollow"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setUnfollowUser({ _id, username, avatar });
                                  unfollowModalDisclosure.onOpen();
                                }}
                              >
                                {isLoading ? (
                                  <RotatingLoader w="20" sw={"7"} />
                                ) : (
                                  "Following"
                                )}
                              </Button>
                            ) : (
                              <Button
                                variant={"follow-button"}
                                title="Follow"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(
                                    handleFollowUnfollowUser({
                                      _id,
                                      follow: true,
                                      username,
                                    })
                                  );
                                }}
                              >
                                {isLoading ? (
                                  <RotatingLoader w="20" sw={"7"} />
                                ) : (
                                  "Follow"
                                )}
                              </Button>
                            )}
                          </Flex>
                        </Flex>
                      );
                    } else if (type === "like") {
                      const { url, _id: postId } = post;
                      return (
                        <Flex
                          key={_id}
                          gap={"2"}
                          my={"2"}
                          cursor={"pointer"}
                          w={"100%"}
                          title={username}
                          onClick={() => {
                            navigate(`/post/${postId}`);
                            onClose();
                          }}
                          _hover={
                            colorMode === "dark" ? { bg: "#323232ad" } : ""
                          }
                        >
                          <Flex alignItems={"center"} gap={"2"}>
                            <Avatar size="md" src={avatar?.url} />
                          </Flex>
                          <Flex
                            gap={{ base: "0.5rem", md: "1rem" }}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            w={"100%"}
                          >
                            <Flex flexWrap={"wrap"}>
                              <Text wordBreak={"break-word"}>
                                <Text
                                  as="span"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/profile/${username}`);
                                    onClose();
                                  }}
                                  {...userNameStyle}
                                >
                                  {username}
                                </Text>
                                <Text as="span" ml={"0.2rem"}>
                                  liked your photo.
                                </Text>
                                <Text
                                  fontSize={"14px"}
                                  color={"#717171e0"}
                                  display={"inline"}
                                  ml={"0.2rem"}
                                  wordBreak={"break-word"}
                                >
                                  {getRelativeTime(createdAt)}
                                </Text>
                              </Text>
                            </Flex>
                            <Image
                              src={url}
                              w={"50px"}
                              h={"50px"}
                              borderRadius={"14px"}
                            />
                          </Flex>
                        </Flex>
                      );
                    } else if (type === "comment") {
                      const { url, _id: postId } = post;
                      const { text } = comment;
                      return (
                        <Flex
                          key={postId}
                          gap={"2"}
                          my={"2"}
                          cursor={"pointer"}
                          w={"100%"}
                          title={username}
                          onClick={() => {
                            navigate(`/post/${postId}`);
                            onClose();
                          }}
                          _hover={
                            colorMode === "dark" ? { bg: "#323232ad" } : ""
                          }
                        >
                          <Flex alignItems={"center"} gap={"2"}>
                            <Avatar size="md" src={avatar?.url} />
                          </Flex>
                          <Flex
                            gap={{ base: "0.5rem", md: "1rem" }}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            w={"100%"}
                          >
                            <Flex flexWrap={"wrap"}>
                              <Text wordBreak={"break-word"}>
                                <Text
                                  as="span"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/profile/${username}`);
                                    onClose();
                                  }}
                                  {...userNameStyle}
                                >
                                  {username}
                                </Text>
                                <Text as="span" ml={"0.2rem"}>
                                  commented:
                                </Text>
                                <Text
                                  display={"inline"}
                                  ml={"0.2rem"}
                                  wordBreak={"break-word"}
                                >
                                  {text}
                                </Text>
                                <Text
                                  fontSize={"14px"}
                                  color={"#717171e0"}
                                  display={"inline"}
                                  ml={"0.2rem"}
                                  wordBreak={"break-word"}
                                >
                                  {getRelativeTime(createdAt)}
                                </Text>
                              </Text>
                            </Flex>
                            <Image
                              src={url}
                              minW={"50px"}
                              maxW={"50px"}
                              h={"50px"}
                              borderRadius={"14px"}
                            />
                          </Flex>
                        </Flex>
                      );
                    } else if (type === "commentLike") {
                      const { url, _id: postId } = post;
                      const { text } = comment;
                      return (
                        <Flex
                          key={postId}
                          gap={"2"}
                          my={"2"}
                          cursor={"pointer"}
                          w={"100%"}
                          title={username}
                          onClick={() => {
                            navigate(`/post/${postId}`);
                            onClose();
                          }}
                          _hover={
                            colorMode === "dark" ? { bg: "#323232ad" } : ""
                          }
                        >
                          <Flex alignItems={"center"} gap={"2"}>
                            <Avatar size="md" src={avatar?.url} />
                          </Flex>
                          <Flex
                            gap={{ base: "0.5rem", md: "1rem" }}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            w={"100%"}
                          >
                            <Flex flexWrap={"wrap"}>
                              <Text wordBreak={"break-word"}>
                                <Text
                                  as="span"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/profile/${username}`);
                                    onClose();
                                  }}
                                  {...userNameStyle}
                                >
                                  {username}
                                </Text>
                                <Text as="span" ml={"0.2rem"}>
                                  liked your comment:
                                </Text>
                                <Text
                                  display={"inline"}
                                  ml={"0.2rem"}
                                  wordBreak={"break-word"}
                                >
                                  {text}
                                </Text>
                                <Text
                                  fontSize={"14px"}
                                  color={"#717171e0"}
                                  display={"inline"}
                                  ml={"0.2rem"}
                                  wordBreak={"break-word"}
                                >
                                  {getRelativeTime(createdAt)}
                                </Text>
                              </Text>
                            </Flex>
                            <Image
                              src={url}
                              minW={"50px"}
                              maxW={"50px"}
                              h={"50px"}
                              borderRadius={"14px"}
                            />
                          </Flex>
                        </Flex>
                      );
                    }
                  }
                )}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {unfollowModalDisclosure.isOpen && (
        <UnfollowModal
          isOpen={unfollowModalDisclosure.isOpen}
          onClose={unfollowModalDisclosure.onClose}
          {...unfollowUser}
        />
      )}
    </Box>
  );
};
