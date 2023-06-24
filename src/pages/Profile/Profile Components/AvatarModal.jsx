import {
  Avatar,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const avatarUrls = [
  "https://tse1.mm.bing.net/th?id=OIP.BFzFHuNVf8BaHZYsvnYoyQAAAA&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.on3EVJB51Y-FvNZrpKC-IwHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.GO9zJZNSF9Hsymo7GNVJswHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.izrjMmF0gU6MZgFHALX_wgHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.JBpgUJhTt8cI2V05-Uf53AHaG1&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP.YaW37ixgx4Uo0V7l0LsInQAAAA&pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th?id=OIP.q2gObYBRPGor08UW4amkBAHaHa&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP._alu9aiG-24kwJUYeIaRugAAAA&pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th?id=OIP.vu9rh-wwqzY4i46U10L0uAHaHa&pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th?id=OIP.NYghOL2lgnj_4Ih_zDratAHaHa&pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th?id=OIP.5CYXZ2aEryUVopAJxKE9aQHaHa&pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th?id=OIP.7tTAo8gFMfyI-o-EjaaxKQHaHa&pid=Api&P=0&h=180",
];

const AvatarModal = ({ isOpen, onClose, handleCartoonAvatar }) => {
  const { colorMode } = useColorMode();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={"380px"}
        bg={colorMode === "dark" ? "black.700" : "white.500"}
      >
        <ModalHeader>Choose Avatar</ModalHeader>
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

export default AvatarModal;
