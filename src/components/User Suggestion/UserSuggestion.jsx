import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, usePost, useUser } from "../../contexts";
import {
  userSuggestionAllProfileBox,
  userSuggestionContainer,
  userSuggestionMainProfile,
} from "../../styles/UserSuggestionStyles";
import { useNavigate } from "react-router-dom";
import SwitchAccountModal from "./UserSuggestion Components/SwitchAccountModal";
import { SET_FILTER } from "../../utils/Constants";

export const UserSuggestion = () => {
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const {
    userState: { users },
    handleFollow,
  } = useUser();
  const { currentUser } = useAuth();
  const {
    postState: { filter },
    postDispatch,
  } = usePost();

  const suggestedUser = users?.filter(
    (user) =>
      user._id !== currentUser?._id &&
      !currentUser?.following?.some(
        ({ username }) => username === user.username
      )
  );

  return (
    <Box {...userSuggestionContainer}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        display={{ base: "none", lg: "flex" }}
      >
        <Flex
          {...userSuggestionMainProfile}
          title={currentUser.username}
          cursor={"pointer"}
          onClick={() => navigate(`/profile/${currentUser.username}`)}
        >
          <Avatar
            size="lg"
            name={currentUser.username}
            src={
              currentUser.avatarURL ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
            }
          />
          <Text fontWeight={"normal"} justifySelf={"flex-end"}>
            {currentUser.username}
          </Text>
        </Flex>
        <Button variant={"link-button"} onClick={onOpen}>
          Switch
        </Button>

        <Modal onClose={onClose} size={"sm"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent bg={colorMode === "light" ? "white.500" : "black.700"}>
            <ModalHeader borderBottom={"1px solid gray"}>
              Switch Accounts
            </ModalHeader>
            <ModalCloseButton _hover={{ bg: "red", color: "white" }} />
            <SwitchAccountModal onClose={onClose} />
          </ModalContent>
        </Modal>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg">
        <Button
          onClick={() =>
            postDispatch({ type: SET_FILTER, payload: "trending" })
          }
          color={filter === "trending" ? "blue" : "green"}
        >
          Trending
        </Button>
        <Button
          color={filter === "latest" ? "blue" : "green"}
          onClick={() => postDispatch({ type: SET_FILTER, payload: "latest" })}
        >
          Latest
        </Button>
        <Flex p="3" align="center">
          <Text fontWeight="semibold" mx={"auto"}>
            Suggested For You
          </Text>
        </Flex>

        <Flex
          flexDir={{ base: "row", lg: "column" }}
          w={{ base: "100vw", md: "auto" }}
          overflow={"auto"}
          maxW={"100%"}
        >
          {suggestedUser?.map(({ _id, username, firstName, avatarURL }) => (
            <Flex key={_id} {...userSuggestionAllProfileBox}>
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                align={"center"}
                gap={"0.5rem"}
                title={username}
                onClick={() => navigate(`/profile/${username}`)}
              >
                <Avatar
                  size={{ base: "md", md: "sm" }}
                  name={firstName}
                  src={
                    avatarURL ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                  }
                />
                <Box>
                  <Text fontSize="sm">{username}</Text>
                </Box>
              </Flex>
              <Button
                variant={"link-button"}
                size="sm"
                colorScheme="blue"
                onClick={() => handleFollow(_id)}
              >
                Follow
              </Button>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
