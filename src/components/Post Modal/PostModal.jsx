import { useCallback, useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

import { FcAddImage, RxCross2 } from "../../utils/Icons";
import { imageCrossButton, postTextarea } from "../../styles/PostModalStyles";
import {
  inputLengthReader,
  postUploadingLoaderStyle,
  postUploadInput,
} from "../../styles/GlobalStyles";
import {
  handleEditPost,
  handleUploadPost,
  updateUploadPost,
} from "../../pages/Post Feed/postSlice";
import { Vortex } from "react-loader-spinner";
import { EmojiPopover } from "../EmojiPopover/EmojiPopover";
import { UserMentionList } from "../UserMention List/UserMentionList";
import { debounce, handleInputChange } from "../../utils/Utils";
import { getSearchedUsers } from "../../pages/Post Feed/userSlice";

export const PostModal = ({ isOpen, onClose, edit, _id }) => {
  const { colorMode } = useColorMode();

  const [selectedPost, setSelectedPost] = useState(null);
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const inputRef = useRef(null);

  const { uploadPost, isUploading } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const { caption, url } = uploadPost;
  const [postValue, setPostValue] = useState(caption);

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleInputValue = (e) => {
    const { value } = e.target;
    if (value.length <= 2200) {
      handleInputChange(
        e,
        setPostValue,
        setMatchIndex,
        setShowTagBox,
        debouncedFetchData,
        dispatch
      );
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

  const handlePost = () => {
    if (currentUser?.guest) {
      toast.error("Guest users cannot upload posts");
      dispatch(updateUploadPost({ caption: "", url: "" }));
      setPostValue("");
      onClose();
      return;
    }
    if (!selectedPost && !edit) {
      toast.error("Please select a photo to upload");
      return;
    }
    const postData = new FormData();
    postData.append("caption", caption);
    postData.append("post", selectedPost);

    const action = edit
      ? handleEditPost({ _id, caption })
      : handleUploadPost({ postData });
    dispatch(action).then(() => {
      dispatch(updateUploadPost({ caption: "", url: "" }));
      setPostValue("");
      onClose();
    });
  };

  useEffect(() => {
    dispatch(updateUploadPost({ ...uploadPost, caption: postValue }));
  }, [postValue]);

  return (
    <Box p={{ base: "0", md: 4 }}>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (!isUploading) {
            onClose();
            dispatch(updateUploadPost({ caption: "", url: "" }));
            setPostValue("");
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
          border="1px solid gray"
          bg={colorMode === "light" ? "white" : "black"}
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
              <Flex justifyContent="center" alignItems="center" minH="30vh">
                <Vortex {...postUploadingLoaderStyle} />
              </Flex>
            ) : (
              <>
                <Flex align="center" mb={4} pos="relative">
                  {showTagBox && (
                    <UserMentionList
                      matchIndex={matchIndex}
                      commentValue={postValue}
                      setCommentValue={setPostValue}
                      setShowTagBox={setShowTagBox}
                      setMatchIndex={setMatchIndex}
                      bottom={true}
                    />
                  )}
                  <Textarea
                    {...postTextarea}
                    onChange={handleInputValue}
                    value={postValue}
                    ref={inputRef}
                  />
                  <Text
                    {...inputLengthReader}
                    color={postValue.length >= 2190 ? "red" : ""}
                  >{`${postValue.length || 0}/2200`}</Text>
                </Flex>
                {url && (
                  <Flex mt="2rem" justifyContent="center" pos="relative">
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
                  display="flex"
                  justifyContent="space-between"
                  pos="relative"
                >
                  <Flex justify="flex-start" gap="1rem">
                    <label htmlFor="photo-upload">
                      <input
                        {...postUploadInput}
                        onChange={handlePhotoChange}
                        disabled={isUploading}
                      />
                      <FcAddImage
                        fontSize="2rem"
                        cursor="pointer"
                        title="Add Photo"
                      />
                    </label>

                    <EmojiPopover
                      setCommentValue={setPostValue}
                      commentValue={postValue}
                      inputRef={inputRef}
                      singlePost={true}
                      bottom={true}
                    />
                  </Flex>
                  <Button
                    variant="link-button"
                    disabled={isUploading || postValue.length === 0 || !url}
                    onClick={handlePost}
                    fontSize="1rem"
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
