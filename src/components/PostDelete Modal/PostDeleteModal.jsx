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
import { useDispatch } from "react-redux";
import { simpleButton } from "../../styles/GlobalStyles";
import { handleDeletePost } from "../../pages/Post Feed/postSlice";
import { useNavigate } from "react-router-dom";

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
          <Text
            color={"gray"}
            fontSize={"0.8rem"}
            textAlign={"center"}
            mb={"0.5rem"}
            px={"1rem"}
          >
            Are you sure you want to delete this post?
          </Text>
          <Divider />
          <Button
            sx={simpleButton}
            color={"#ed4956"}
            onClick={() => {
              dispatch(handleDeletePost({ _id }));
              fromSinglePost ? navigate(location) : "";
              infoPopupOnclose();
              onClose();
            }}
          >
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
