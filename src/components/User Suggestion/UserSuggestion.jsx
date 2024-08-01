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
import { useDispatch, useSelector } from "react-redux";

import {
  userSuggestionContainer,
  userSuggestionMainProfile,
} from "../../styles/UserSuggestionStyles";
import { SwitchAccountModal, UserSuggestionMain } from "../index";
import { updateTab } from "../../pages/Post Feed/userSlice";
import { userNameStyle } from "../../styles/GlobalStyles";

export const UserSuggestion = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentUser } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

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
          onClick={() => {
            dispatch(updateTab(0));
            navigate(`/profile/${currentUser.username}`);
          }}
        >
          <Avatar size="lg" src={currentUser.avatar?.url} />
          <Text justifySelf={"flex-end"} {...userNameStyle}>
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
