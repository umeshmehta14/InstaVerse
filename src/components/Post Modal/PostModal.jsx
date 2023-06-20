import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Img,
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
import { toast } from "react-hot-toast";

import { FcAddImage, BsEmojiSunglasses, RxCross2 } from "../../utils/Icons";
import { usePost } from "../../contexts";
import { postTextarea } from "../../styles/PostModalStyles";
import { useEffect } from "react";
import { SET_EDIT_POST } from "../../utils/Constants";

export const PostModal = ({ isOpen, onClose, edit }) => {
  const { colorMode } = useColorMode();
  const {
    handleCreatePost,
    handleEditPost,
    postState: { editPost },
    postDispatch,
  } = usePost();
  const [postValue, setPostValue] = useState({
    content: "",
    mediaUrl: "",
  });

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value?.length <= 2200) {
      setPostValue({ ...postValue, content: value });
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPostValue({ ...postValue, mediaUrl: URL.createObjectURL(file) });
  };

  useEffect(() => {
    setPostValue({
      content: editPost?.content,
      mediaUrl: editPost?.mediaUrl,
    });
  }, [isOpen]);

  const handlePost = () => {
    if (postValue.mediaUrl === "") {
      toast.error("Please select a picture");
    } else if (postValue.content === "") {
      toast.error("Please write caption for your post");
    } else {
      if (edit) {
        handleEditPost({ ...postValue, _id: editPost._id });
      } else {
        handleCreatePost(postValue);
      }
      setPostValue({ content: "", mediaUrl: "" });
      postDispatch({ type: SET_EDIT_POST, payload: {} });
      onClose();
    }
  };

  return (
    <Box p={{ base: "0", md: 4 }}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPostValue({ content: "", mediaUrl: "" });
          postDispatch({ type: SET_EDIT_POST, payload: {} });
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
                {...postTextarea}
                onChange={handleInputChange}
                value={postValue.content}
              />
              <Text
                pos={"absolute"}
                bottom={"-1rem"}
                right={"0.5rem"}
                fontSize={"0.7rem"}
                color={postValue?.content?.length >= 2190 ? "red" : ""}
              >{`${postValue?.content?.length || 0}/2200`}</Text>
            </Flex>
            {postValue?.mediaUrl && (
              <Flex mt={"2rem"} justifyContent={"center"} pos={"relative"}>
                <Img src={postValue?.mediaUrl} alt="Selected" width="200px" />
                <Box
                  as={RxCross2}
                  position={"absolute"}
                  fontSize={"1.5rem"}
                  right={"3rem"}
                  cursor={"pointer"}
                  title="Remove"
                  onClick={() => setPostValue({ ...postValue, mediaUrl: "" })}
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
            <Button
              variant={"link-button"}
              onClick={handlePost}
              fontSize={"1rem"}
              title="Share"
            >
              Share
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
