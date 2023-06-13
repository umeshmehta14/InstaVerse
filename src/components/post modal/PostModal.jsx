import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";

import { FcAddImage, BsEmojiSunglasses } from "../../utils/Icons";

const PostModal = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setSelectedPhoto(file);
  };

  const handleModalClose = () => {
    onClose();
    setSelectedPhoto(null);
  };

  const handlePost = () => {
    onClose();
    setSelectedPhoto(null);
  };

  return (
    <Box p={{base:"0", md:4}}>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          border={"1px solid gray"}
          bg={colorMode === "light" ? "white.500" : "black.900"}
        >
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton
            color={colorMode === "light" ? "black" : "white"}
            _hover={{ bg: "red" }}
            onClick={handleModalClose}
          />
          <ModalBody>
            <Flex align="center" mb={4}>
              <Textarea
                flex="1"
                placeholder="What's on your mind?"
                size="lg"
                resize="none"
                borderRadius="md"
                focusBorderColor="blue.400"
              />
            </Flex>
            {selectedPhoto && (
              <Flex mt={4} justifyContent={"center"}>
                <img
                  src={URL.createObjectURL(selectedPhoto)}
                  alt="Selected"
                  width="200"
                />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter display={"flex"} justifyContent={"space-between"}>
            <Flex justify="flex-start" gap={"1rem"}>
              <label htmlFor="photo-upload">
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
                <FcAddImage
                  fontSize={"2rem"}
                  cursor={"pointer"}
                  title="Add Photo"
                />
              </label>
              <BsEmojiSunglasses
                fontSize={"1.8rem"}
                cursor="pointer"
                title="Emoji"
              />
            </Flex>
            <Button bg={"gray.100"} size="sm" onClick={handlePost} title="Post">
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PostModal;
