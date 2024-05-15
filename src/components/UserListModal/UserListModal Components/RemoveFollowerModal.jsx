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

import { simpleButton } from "../../../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { handleRemoveFollower } from "../../../pages/Post Feed/userSlice";

export const RemoveFollowerModal = ({
  isOpen,
  onClose,
  _id,
  username,
  avatar,
}) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        mt={"15rem"}
        maxWidth={"390px"}
      >
        <VStack pt={"1.5rem"} pb={"0.5rem"}>
          <Avatar size={"xl"} src={avatar?.url} />
          <Text m="0.5rem">Remove follower?</Text>
          <Text
            textAlign={"center"}
            color={"gray"}
            fontSize={"14px"}
            p={"0 1rem 0.5rem 1rem"}
          >
            Instaverse won't tell {username} that they were removed from your
            followers.
          </Text>
          <Divider />
          <Button
            sx={simpleButton}
            color={"red"}
            onClick={() => {
              dispatch(handleRemoveFollower({ _id }));
              onClose();
            }}
          >
            Remove
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
