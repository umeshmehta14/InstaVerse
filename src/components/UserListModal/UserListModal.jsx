import React, { useState } from "react";
import {
  Avatar,
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuth, useUser } from "../../contexts";
import { UnfollowModal, RotatingLoader } from "../index";
import { SET_LOADING_USERS, SET_UNFOLLOW_USER } from "../../utils/Constants";

export const UserListModal = ({ onClose, isOpen, users, heading }) => {
  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  const unfollowDisclosure = useDisclosure();

  const { currentUser } = useAuth();
  const {
    handleFollow,
    handleUnfollow,
    userState: { unfollowUser, loadingUsers },
    userDispatch,
  } = useUser();

  const handleFollowUser = async (username, unfollow) => {
    userDispatch({
      type: SET_LOADING_USERS,
      payload: [...loadingUsers, username],
    });
    if (unfollow) {
      await handleUnfollow(username);
    } else {
      await handleFollow(username);
    }

    userDispatch({
      type: SET_LOADING_USERS,
      payload: loadingUsers.filter((user) => user !== username),
    });
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "black.600" : "white.500"}
          mt={"15rem"}
          maxWidth={"390px"}
        >
          <ModalHeader
            textAlign={"center"}
            borderBottom={"0.5px solid #aaaaaa"}
          >
            {heading}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {users?.map(({ _id, firstName, username, avatarURL }) => {
              const isLoading = loadingUsers.includes(username);
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
                    <Avatar
                      size="sm"
                      name={firstName}
                      src={
                        avatarURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                      }
                    />
                    <Text>{username}</Text>
                  </Flex>
                  {currentUser?.username === username ? (
                    ""
                  ) : currentUser.following.find(
                      (user) => user.username === username
                    ) ? (
                    <Button
                      variant={"following-button"}
                      onClick={() => {
                        userDispatch({
                          type: SET_UNFOLLOW_USER,
                          payload: {
                            username: username,
                            avatarURL: avatarURL,
                          },
                        });
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
                      onClick={() => handleFollowUser(username)}
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
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
      {unfollowDisclosure.isOpen && (
        <UnfollowModal
          {...unfollowUser}
          handleFollowUser={handleFollowUser}
          isOpen={unfollowDisclosure.isOpen}
          onClose={unfollowDisclosure.onClose}
        />
      )}
    </>
  );
};
