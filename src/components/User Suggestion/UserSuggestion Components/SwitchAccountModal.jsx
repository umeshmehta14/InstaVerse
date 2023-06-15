import React from "react";
import { Avatar, Box, Button, Flex, ModalBody, Text } from "@chakra-ui/react";

import { userList } from "../../../styles/SuggestionBoxStyle";
import { useAuth, useUser } from "../../../contexts";
import { VscPassFilled } from "../../../utils/Icons";

const SwitchAccountModal = ({ onClose }) => {
  const { logoutHandler, handleGuestLogin, currentUser } = useAuth();
  const {
    userState: { users },
  } = useUser();

  return (
    <ModalBody>
      {users.map((user) => {
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
              <Avatar
                size="sm"
                name={firstName}
                src={
                  avatarURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                }
              />
              <Text>{username}</Text>
            </Flex>
            {currentUser.username === username ? (
              <Box as={VscPassFilled} fontSize={"1.4rem"} color="blue.500" />
            ) : null}
          </Flex>
        );
      })}
      <Button variant={"link-button"} w="100%" p="1rem" onClick={logoutHandler}>
        Log In to an Existing Account
      </Button>
    </ModalBody>
  );
};

export default SwitchAccountModal;
