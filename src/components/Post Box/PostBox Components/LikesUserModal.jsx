import React from "react";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAuth, useUser } from "../../../contexts";

const LikesUserModal = ({ btnRef, onClose, isOpen, likedBy }) => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const { handleUnfollow } = useUser();
  const { currentUser } = useAuth();

  return (
    <Modal onClose={onClose} finalFocusRef={btnRef} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        mt={"15rem"}
      >
        <ModalHeader textAlign={"center"} borderBottom={"0.5px solid #aaaaaa"}>
          Liked By
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {likedBy?.map(({ _id, firstName, username, avatarURL }) => (
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
                  onClick={() => handleUnfollow(username)}
                >
                  Following
                </Button>
              ) : (
                <Button variant={"follow-button"}>Follow</Button>
              )}
            </Flex>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LikesUserModal;
