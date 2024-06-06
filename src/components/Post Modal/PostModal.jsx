import React, { useState, useEffect } from "react";
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
import { SET_POSTVALUE } from "../../utils/Constants";
import { inputLengthReader } from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEditPost,
  handleUploadPost,
  updateUploadPost,
} from "../../pages/Post Feed/postSlice";
import { Vortex } from "react-loader-spinner";

export const PostModal = ({ isOpen, onClose, edit, _id }) => {
  const { colorMode } = useColorMode();
  const { postDispatch } = usePost();

  const [selectedPost, setSelectedPost] = useState("");

  const { uploadPost, isUploading } = useSelector((state) => state.post);

  const { caption, url } = uploadPost;
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value?.length <= 2200) {
      dispatch(updateUploadPost({ ...uploadPost, caption: value }));
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const fileSizeLimit = 10 * 1024 * 1024;

    if (file) {
      if (file.size > fileSizeLimit) {
        toast.error("File size exceeds 10MB. Please select a smaller file.");
        return;
      }
      setSelectedPost(file);
      dispatch(
        updateUploadPost({ ...uploadPost, url: URL.createObjectURL(file) })
      );
    }
  };

  useEffect(() => {}, [isOpen]);

  const handlePost = () => {
    if (edit) {
      dispatch(handleEditPost({ _id, caption })).then(() => {
        dispatch(updateUploadPost({ caption: "", url: "" }));
        onClose();
      });
    } else {
      const data = new FormData();
      data.append("caption", caption);
      data.append("post", selectedPost);
      dispatch(handleUploadPost({ postData: data })).then(() => {
        dispatch(updateUploadPost({ caption: "", url: "" }));
        onClose();
      });
    }
  };

  return (
    <Box p={{ base: "0", md: 4 }}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (!isUploading) {
            onClose();
            dispatch(updateUploadPost({ caption: "", url: "" }));
          }
        }}
        size="xl"
        closeOnOverlayClick={!isUploading}
        isClosable={!isUploading}
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          border={"1px solid gray"}
          bg={colorMode === "light" ? "white.500" : "black.900"}
        >
          <ModalHeader>
            {isUploading ? "Sharing" : edit ? "Edit Post" : "Create New Post"}
          </ModalHeader>
          {!isUploading && (
            <ModalCloseButton
              color={colorMode === "light" ? "black" : "white"}
              _hover={{ bg: "red" }}
            />
          )}
          <ModalBody>
            {isUploading ? (
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                minH={"30vh"}
              >
                <Vortex
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="vortex-loading"
                  wrapperClass="vortex-wrapper"
                  colors={[
                    "red",
                    "green",
                    "blue",
                    "yellow",
                    "orange",
                    "purple",
                  ]}
                />
              </Flex>
            ) : (
              <>
                <Flex align="center" mb={4} pos={"relative"}>
                  <Textarea
                    {...postTextarea}
                    onChange={handleInputChange}
                    value={caption}
                  />
                  <Text
                    {...inputLengthReader}
                    color={caption?.length >= 2190 ? "red" : ""}
                  >{`${caption?.length || 0}/2200`}</Text>
                </Flex>
                {url && (
                  <Flex mt={"2rem"} justifyContent={"center"} pos={"relative"}>
                    <Img src={url} alt="Selected" width="200px" />
                    {!edit && (
                      <Box
                        as={RxCross2}
                        {...imageCrossButton}
                        title="Remove"
                        onClick={() =>
                          dispatch(updateUploadPost({ ...uploadPost, url: "" }))
                        }
                      />
                    )}
                  </Flex>
                )}
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
                        disabled={isUploading}
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
                              dispatch(
                                updateUploadPost({
                                  ...uploadPost,
                                  caption: caption + emoji.native,
                                })
                              )
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
                    disabled={
                      isUploading || caption.length === 0 || url.length === 0
                    }
                    onClick={handlePost}
                    fontSize={"1rem"}
                    title={edit ? "Edit" : "Share"}
                  >
                    {edit ? "Edit" : "Share"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
