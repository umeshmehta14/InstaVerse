import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  ModalBody,
  Text,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";

import { userList } from "../../styles/SuggestionBoxStyle";
import { useAuth, useUser } from "../../contexts";
import { VscPassFilled } from "../../utils/Icons";

export const SwitchAccountModal = ({ onClose, isOpen }) => {
  const { logoutHandler, handleGuestLogin, currentUser } = useAuth();
  const { colorMode } = useColorMode();

  const {
    userState: { users },
  } = useUser();

  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg={colorMode === "light" ? "white.500" : "black.700"}>
        <ModalHeader borderBottom={"1px solid gray"}>
          Switch Accounts
        </ModalHeader>
        <ModalCloseButton _hover={{ bg: "red", color: "white" }} />
        <ModalBody>
          {users?.map((user) => {
            const { _id, firstName, username, avatarURL } = user;
            return (
              <Flex
                key={_id}
                {...userList}
                onClick={() => {
                  handleGuestLogin(user);
                  onClose();
                }}
              >
                <Flex alignItems={"center"} gap={"2"}>
                  <Avatar size="sm" name={firstName} src={avatarURL} />
                  <Text>{username}</Text>
                </Flex>
                {currentUser?.username === username ? (
                  <Box
                    as={VscPassFilled}
                    fontSize={"1.4rem"}
                    color="blue.500"
                  />
                ) : null}
              </Flex>
            );
          })}
          <Button
            variant={"link-button"}
            w="100%"
            p="1rem"
            onClick={logoutHandler}
          >
            Log In to an Existing Account
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
