import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { UnfollowModal, RotatingLoader } from "../index";
import { handleFollowUnfollowUser } from "../../pages/Post Feed/userSlice";
import { useState } from "react";
import { BsDot } from "../../utils/Icons";
import { RemoveFollowerModal } from "./UserListModal Components/RemoveFollowerModal";

export const UserListModal = ({ onClose, isOpen, heading }) => {
  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const unfollowDisclosure = useDisclosure();
  const removeFollowerDisclosure = useDisclosure();

  const [removeUser, setRemoveUser] = useState({});

  const { currentUser } = useSelector((state) => state.authentication);
  const {
    loadingUsers,
    isLoading,
    userList,
    selectedUser,
    removeFollowerUser,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [unfollowUser, setUnfollowUser] = useState({});

  const currentUserCheck = currentUser?.username === selectedUser?.username;

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "black.600" : "white.500"}
          mt={"7rem"}
          maxWidth={"390px"}
        >
          <ModalHeader
            textAlign={"center"}
            borderBottom={"0.5px solid #aaaaaa"}
          >
            {heading}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            maxH="48vh"
            overflowX="auto"
            minH={"40vh"}
            p={"0.4rem 0.8rem"}
          >
            {isLoading ? (
              <VStack justifyContent={"center"} h={"35vh"}>
                <RotatingLoader w={"50"} sw={"3"} />
              </VStack>
            ) : !isLoading && userList?.length === 0 ? (
              <Flex
                justifyContent={"center"}
                h={"35vh"}
                fontSize="1.5rem"
                alignItems={"center"}
              >
                No {heading}
              </Flex>
            ) : (
              userList?.map(({ _id, fullName, username, avatar }) => {
                const isLoading = loadingUsers.includes(_id);
                const isRemoveFollowerLoading =
                  removeFollowerUser.includes(_id);
                const isFollowing = currentUser.following.find(
                  (user) => user.username === username
                );
                return (
                  <Flex
                    key={_id}
                    gap={"2"}
                    cursor={"pointer"}
                    align={"center"}
                    p="2"
                    justifyContent={"space-between"}
                  >
                    <Flex
                      alignItems={"center"}
                      gap={"2"}
                      onClick={() => {
                        navigate(`/profile/${username}`);
                        onClose();
                      }}
                    >
                      <Avatar size="md" src={avatar.url} />
                      <Flex flexDir={"column"} justifyContent={"center"}>
                        <Flex alignItems={"center"}>
                          {username}
                          {!isFollowing &&
                            currentUserCheck &&
                            heading === "Followers" && (
                              <Flex alignItems={"center"}>
                                <Box as={BsDot} />
                                {isLoading ? (
                                  <RotatingLoader w={"20px"} />
                                ) : (
                                  <Button
                                    variant={"link-button"}
                                    p={0}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      dispatch(
                                        handleFollowUnfollowUser({
                                          _id,
                                          follow: true,
                                          username,
                                          notSelectedUser: true,
                                        })
                                      );
                                    }}
                                  >
                                    Follow
                                  </Button>
                                )}
                              </Flex>
                            )}
                        </Flex>
                        <Text
                          fontWeight={"100"}
                          fontSize={"12px"}
                          color={"gray"}
                        >
                          {fullName}
                        </Text>
                      </Flex>
                    </Flex>
                    {currentUser?.username === username ? (
                      ""
                    ) : heading === "Followers" && currentUserCheck ? (
                      <Button
                        variant={"removeFollower-button"}
                        onClick={() => {
                          setRemoveUser({ _id, username, avatar });
                          removeFollowerDisclosure.onOpen();
                        }}
                      >
                        {isRemoveFollowerLoading ? (
                          <RotatingLoader w={"20"} sw={"7"} />
                        ) : (
                          "Remove"
                        )}
                      </Button>
                    ) : isFollowing ? (
                      <Button
                        variant={"following-button"}
                        onClick={() => {
                          setUnfollowUser({ username, avatar, _id });
                          unfollowDisclosure.onOpen();
                        }}
                      >
                        {isLoading ? (
                          <RotatingLoader w={"20"} sw={"7"} />
                        ) : (
                          "Following"
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant={"follow-button"}
                        onClick={() => {
                          heading === "Liked By"
                            ? dispatch(
                                handleFollowUnfollowUser({
                                  _id,
                                  follow: true,
                                  username,
                                  notSelectedUser: true,
                                  noPostLoading: true,
                                })
                              )
                            : dispatch(
                                handleFollowUnfollowUser({
                                  _id,
                                  follow: true,
                                  username,
                                  notSelectedUser: true,
                                })
                              );
                        }}
                      >
                        {isLoading ? (
                          <RotatingLoader w={"20"} sw={"7"} />
                        ) : (
                          "Follow"
                        )}
                      </Button>
                    )}
                  </Flex>
                );
              })
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      {unfollowDisclosure.isOpen && (
        <UnfollowModal
          {...unfollowUser}
          fromLiked={heading === "Liked By"}
          notSelectedUser={true}
          isOpen={unfollowDisclosure.isOpen}
          onClose={unfollowDisclosure.onClose}
        />
      )}
      {removeFollowerDisclosure.isOpen && (
        <RemoveFollowerModal
          {...removeUser}
          isOpen={removeFollowerDisclosure.isOpen}
          onClose={removeFollowerDisclosure.onClose}
        />
      )}
    </>
  );
};
