import React from "react";
import {
  Avatar,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";

import { avatarUrls } from "../../../utils/Constants";

export const AvatarModal = ({ isOpen, onClose, handleCartoonAvatar }) => {
  const { colorMode } = useColorMode();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={"380px"}
        bg={colorMode === "dark" ? "black.700" : "white.500"}
      >
        <ModalHeader>Choose Avatar</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody
          p="0"
          mx="auto"
          align="center"
          justifyContent={"center"}
          maxW={"310px"}
        >
          <Flex gap={"1rem"} py="1rem" flexWrap={"wrap"}>
            {avatarUrls.map((url) => (
              <Avatar
                key={url}
                size={"lg"}
                src={url}
                cursor={"pointer"}
                _hover={{ border: "4px solid orange" }}
                onClick={() => {
                  handleCartoonAvatar(url);
                  onClose();
                }}
              />
            ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
