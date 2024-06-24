import React from "react";
import {
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { clearModalSmText, simpleButton } from "../../styles/GlobalStyles";
import { handleDeletePost } from "../../pages/Post Feed/postSlice";

export const PostDeleteModal = ({
  isOpen,
  onClose,
  _id,
  fromSinglePost,
  location,
  infoPopupOnclose,
}) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authentication);

  const handleDelete = () => {
    if (currentUser.guest) {
      toast.error("Guest users cannot delete posts.");
    } else {
      dispatch(handleDeletePost({ _id }));
      if (fromSinglePost) {
        navigate(location);
      }
    }
    infoPopupOnclose();
    onClose();
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        mt={"15rem"}
        maxWidth={"390px"}
      >
        <VStack pt={"1.5rem"} pb={"0.5rem"}>
          <Text fontSize={"1.3rem"}>Delete post?</Text>
          <Text {...clearModalSmText}>
            Are you sure you want to delete this post?
          </Text>
          <Divider />
          <Button sx={simpleButton} color={"#ed4956"} onClick={handleDelete}>
            Delete
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
