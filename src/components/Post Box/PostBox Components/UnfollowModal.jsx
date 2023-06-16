import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import { useUser } from "../../../contexts";
import { simpleButton } from "../../../styles/PostBoxStyles";

const UnfollowModal = ({
  isOpen,
  onClose,
  username,
  avatarURL,
  handleFollowUser,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        mt={"15rem"}
        maxWidth={"390px"}
      >
        <VStack pt={"1.5rem"} pb={"0.5rem"}>
          <Avatar size={"xl"} src={avatarURL} />
          <Text m="0.5rem">unfollow @{username}?</Text>
          <Divider />
          <Button
            sx={simpleButton}
            color={"red"}
            onClick={() => {
              handleFollowUser(username, true);
              onClose();
            }}
          >
            Unfollow
          </Button>
          <Divider />
          <Button sx={simpleButton} onClick={onClose}>
            Close
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default UnfollowModal;
