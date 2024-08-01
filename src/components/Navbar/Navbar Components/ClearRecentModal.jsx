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

import { clearModalSmText, simpleButton } from "../../../styles/GlobalStyles";
import { clearUserSearchList } from "../../../pages/Post Feed/userSlice";

export const ClearRecentModal = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();

  const dispatch = useDispatch();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        mt={"15rem"}
        maxWidth={"390px"}
        borderRadius={"1.5rem"}
      >
        <VStack pt={"1.5rem"} pb={"0.5rem"}>
          <Text mt="0.5rem" fontSize={"1.2rem"}>
            Clear search history?
          </Text>
          <Text {...clearModalSmText}>
            You won't be able to undo this. If you clear your search history,
            you may still see accounts that you've searched for as suggested
            results.
          </Text>
          <Divider />
          <Button
            sx={simpleButton}
            color={"#ed4956"}
            onClick={() => {
              dispatch(clearUserSearchList());
              onClose();
            }}
          >
            Clear All
          </Button>
          <Divider />
          <Button sx={simpleButton} onClick={onClose}>
            Not Now
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
