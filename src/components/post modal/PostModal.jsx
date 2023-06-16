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
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";

import { FcAddImage, BsEmojiSunglasses } from "../../utils/Icons";
import { usePost } from "../../contexts";

export const PostModal = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const { handleCreatePost } = usePost();
  const [postValue, setPostValue] = useState({
    content: "",
    mediaUrl: "",
  });

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value.length <= 200) {
      setPostValue({ ...postValue, content: value });
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPostValue({ ...postValue, mediaUrl: URL.createObjectURL(file) });
  };

  const handlePost = () => {
    handleCreatePost(postValue);
    setPostValue({ content: "", mediaUrl: "" });
    onClose();
  };

  return (
    <Box p={{ base: "0", md: 4 }}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPostValue({ content: "", mediaUrl: "" });
        }}
        size="xl"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          border={"1px solid gray"}
          bg={colorMode === "light" ? "white.500" : "black.900"}
        >
          <ModalHeader>Create New Post</ModalHeader>
          <ModalCloseButton
            color={colorMode === "light" ? "black" : "white"}
            _hover={{ bg: "red" }}
          />
          <ModalBody>
            <Flex align="center" mb={4} pos={"relative"}>
              <Textarea
                flex="1"
                placeholder="Write a caption..."
                size="lg"
                resize="none"
                borderRadius="md"
                focusBorderColor="blue.400"
                maxLength={200}
                onChange={handleInputChange}
                value={postValue.content}
              />
              <Text
                pos={"absolute"}
                bottom={"-1rem"}
                right={"0.5rem"}
                fontSize={"0.7rem"}
                color={postValue.content.length >= 195 ? "red" : ""}
              >{`${postValue.content.length}/200`}</Text>
            </Flex>
            {postValue.mediaUrl && (
              <Flex mt={4} justifyContent={"center"}>
                <img src={postValue.mediaUrl} alt="Selected" width="200" />
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
              Share
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
