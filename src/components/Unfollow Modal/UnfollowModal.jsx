import React from "react";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import { simpleButton } from "../../styles/GlobalStyles";
import { useDispatch } from "react-redux";
import { handleFollowUnfollowUser } from "../../pages/Post Feed/userSlice";

export const UnfollowModal = ({
  isOpen,
  onClose,
  _id,
  username,
  avatar,
  fromInfoPop,
}) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.600" : "white.500"}
        mt={"15rem"}
        maxWidth={"390px"}
      >
        <VStack pt={"1.5rem"} pb={"0.5rem"}>
          <Avatar size={"xl"} src={avatar?.url} />
          <Text m="0.5rem">unfollow @{username}?</Text>
          <Divider />
          <Button
            sx={simpleButton}
            color={"red"}
            onClick={() => {
              dispatch(
                handleFollowUnfollowUser({ _id, follow: false, username })
              );
              onClose();
            }}
          >
            Unfollow
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
