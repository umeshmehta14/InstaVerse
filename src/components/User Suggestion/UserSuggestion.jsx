import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import {
  userSuggestionContainer,
  userSuggestionMainProfile,
} from "../../styles/UserSuggestionStyles";
import { SwitchAccountModal } from "../index";
import UserSuggestionMain from "./UserSuggestion Components/UserSuggestionMain";

import { useSelector } from "react-redux";

export const UserSuggestion = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentUser } = useSelector((state) => state.authentication);

  return (
    <Box sx={userSuggestionContainer}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        display={{ base: "none", lg: "flex" }}
      >
        <Flex
          sx={userSuggestionMainProfile}
          title={currentUser.username}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={() => navigate(`/profile/${currentUser.username}`)}
        >
          <Avatar size="lg" src={currentUser.avatar?.url} />
          <Text fontWeight={"normal"} justifySelf={"flex-end"}>
            {currentUser.username}
          </Text>
        </Flex>
        <Button variant={"link-button"} onClick={onOpen}>
          Switch
        </Button>
        <SwitchAccountModal onClose={onClose} isOpen={isOpen} />
      </Flex>

      <UserSuggestionMain />
    </Box>
  );
};
