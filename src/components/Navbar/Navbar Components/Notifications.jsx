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
import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import SearchSkeleton from "./SearchSkeleton";
import { useNavigate } from "react-router-dom";
import { handleFollowUnfollowUser } from "../../../pages/Post Feed/userSlice";
import { UnfollowModal } from "../../Unfollow Modal/UnfollowModal";
import { getRelativeTime } from "../../../utils/Utils";
import { RotatingLoader } from "../../Loader/RotatingLoader";

const Notifications = ({ isOpen, onClose }) => {
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

  console.log(notifications);

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
                {notifications?.map(({ type, actionBy, createdAt, post }) => {
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
                              <strong>{`${username}`}</strong> started following
                              you.
                              <Text
                                fontSize="xs"
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
                    const { url } = post;
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
                      >
                        <Flex alignItems={"center"} gap={"2"}>
                          <Avatar size="md" src={avatar?.url} />
                        </Flex>
                        <Flex
                          gap={{ base: "0.5rem", md: "1rem" }}
                          alignItems={"center"}
                          justifyContent={"space-between"}
                        >
                          <Flex flexWrap={"wrap"}>
                            <Text wordBreak={"break-word"}>
                              <strong>{`${username}`}</strong> liked your photo.
                              <Text
                                fontSize="xs"
                                color={"#717171e0"}
                                display={"inline"}
                                ml={"0.2rem"}
                                wordBreak={"break-word"}
                              >
                                {getRelativeTime(createdAt)}
                              </Text>
                            </Text>
                          </Flex>
                          <Image src={url} w={"50px"} h={"60px"} />
                        </Flex>
                      </Flex>
                    );
                  }
                })}
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

export default Notifications;
