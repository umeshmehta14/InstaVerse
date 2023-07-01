import React from "react";
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
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { FcAddImage, BsEmojiSunglasses, RxCross2 } from "../../utils/Icons";
import { usePost } from "../../contexts";
import { imageCrossButton, postTextarea } from "../../styles/PostModalStyles";
import { useEffect } from "react";
import { SET_EDIT_POST, SET_POSTVALUE } from "../../utils/Constants";
import { inputLengthReader } from "../../styles/GlobalStyles";

export const PostModal = ({ isOpen, onClose, edit }) => {
  const { colorMode } = useColorMode();
  const {
    handleCreatePost,
    handleEditPost,
    postState: { editPost, postValue },
    postDispatch,
  } = usePost();

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value?.length <= 2200) {
      postDispatch({
        type: SET_POSTVALUE,
        payload: { ...postValue, content: value },
      });
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    postDispatch({
      type: SET_POSTVALUE,
      payload: { ...postValue, mediaUrl: URL.createObjectURL(file) },
    });
  };

  useEffect(() => {
    postDispatch({
      type: SET_POSTVALUE,
      payload: {
        content: editPost?.content,
        mediaUrl: editPost?.mediaUrl,
      },
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
      postDispatch({
        type: SET_POSTVALUE,
        payload: { content: "", mediaUrl: "" },
      });
      postDispatch({
        type: SET_EDIT_POST,
        payload: { content: "", mediaUrl: "" },
      });
      onClose();
    }
  };

  return (
    <Box p={{ base: "0", md: 4 }}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          postDispatch({
            type: SET_POSTVALUE,
            payload: { content: "", mediaUrl: "" },
          });
          postDispatch({
            type: SET_EDIT_POST,
            payload: { content: "", mediaUrl: "" },
          });
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
          <ModalHeader>{edit ? "Edit Post" : "Create New Post"}</ModalHeader>
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
                {...inputLengthReader}
                color={postValue?.content?.length >= 2190 ? "red" : ""}
              >{`${postValue?.content?.length || 0}/2200`}</Text>
            </Flex>
            {postValue?.mediaUrl && (
              <Flex mt={"2rem"} justifyContent={"center"} pos={"relative"}>
                <Img src={postValue?.mediaUrl} alt="Selected" width="200px" />
                <Box
                  as={RxCross2}
                  {...imageCrossButton}
                  title="Remove"
                  onClick={() =>
                    postDispatch({
                      type: SET_POSTVALUE,
                      payload: { ...postValue, mediaUrl: "" },
                    })
                  }
                />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter
            display={"flex"}
            justifyContent={"space-between"}
            pos={"relative"}
          >
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

              <Popover>
                <PopoverTrigger>
                  <Box
                    as={BsEmojiSunglasses}
                    fontSize={"1.8rem"}
                    cursor="pointer"
                    title="Emoji"
                  />
                </PopoverTrigger>
                <PopoverContent top={"4rem"} bg={"transparent"}>
                  <PopoverBody p={0}>
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji) =>
                        postDispatch({
                          type: SET_POSTVALUE,
                          payload: {
                            ...postValue,
                            content: postValue.content + emoji.native,
                          },
                        })
                      }
                      theme={colorMode}
                      title="Pick an Emoji"
                      emoji=""
                    />
                  </PopoverBody>
                </PopoverContent>
              </Popover>
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
