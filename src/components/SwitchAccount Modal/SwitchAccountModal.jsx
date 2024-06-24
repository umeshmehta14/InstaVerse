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
import { useDispatch, useSelector } from "react-redux";

import { userList } from "../../styles/SuggestionBoxStyle";
import { VscPassFilled } from "../../utils/Icons";
import {
  loginHandler,
  logoutHandler,
} from "../../pages/Authentication/authenticationSlice";
import { GUEST_USER_PASSWORD } from "../../utils/Constants";
import TailSpinLoader from "../Loader/TailSpinLoader";

export const SwitchAccountModal = ({ onClose, isOpen }) => {
  const { colorMode } = useColorMode();

  const { currentUser } = useSelector((state) => state.authentication);
  const { guestUsers, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Modal onClose={onClose} size={"sm"} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent bg={colorMode === "light" ? "white.500" : "black.700"}>
        <ModalHeader borderBottom={"1px solid gray"}>
          Switch Accounts
        </ModalHeader>
        <ModalCloseButton _hover={{ bg: "red", color: "white" }} />
        <ModalBody>
          {isLoading ? (
            <TailSpinLoader />
          ) : (
            guestUsers?.map((user) => {
              const {
                _id,
                fullName,
                username,
                avatar: { url },
              } = user;
              return (
                <Flex
                  key={_id}
                  {...userList}
                  onClick={() => {
                    currentUser?.username === username
                      ? null
                      : dispatch(logoutHandler());
                    dispatch(
                      loginHandler({
                        identifier: username,
                        password: GUEST_USER_PASSWORD,
                      })
                    );
                    onClose();
                  }}
                >
                  <Flex alignItems={"center"} gap={"2"}>
                    <Avatar size="sm" name={fullName} src={url} />
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
            })
          )}
          <Button
            variant={"link-button"}
            w="100%"
            p="1rem"
            onClick={() => dispatch(logoutHandler())}
          >
            Log In to an Existing Account
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
