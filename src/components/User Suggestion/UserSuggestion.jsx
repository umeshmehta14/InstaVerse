import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import { useAuth, useUser } from "../../contexts";
import {
  userSuggestionAllProfileBox,
  userSuggestionContainer,
  userSuggestionMainProfile,
} from "../../styles/UserSuggestionStyles";
import { VscPassFilled } from "../../utils/Icons";
import { useNavigate } from "react-router-dom";
import { SET_SELECTED_USER } from "../../utils/Constants";
import { userList } from "../../styles/SuggestionBoxStyle";

export const UserSuggestion = () => {
  const {
    userDispatch,
    userState: { users },
    handleFollow,
  } = useUser();
  const { currentUser, logoutHandler, handleGuestLogin } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  console.log(currentUser);

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
            <ModalBody>
              {users.map((user) => (
                <Flex
                  key={user._id}
                  {...userList}
                  onClick={() => {
                    handleGuestLogin(user);
                    onClose();
                  }}
                >
                  <Flex alignItems={"center"} gap={"2"}>
                    <Avatar
                      size="sm"
                      name={user?.firstName}
                      src={
                        user?.avatarURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"
                      }
                    />
                    <Text>{user?.username}</Text>
                  </Flex>
                  {currentUser.username === user.username ? (
                    <Box
                      as={VscPassFilled}
                      fontSize={"1.4rem"}
                      color="blue.500"
                    />
                  ) : null}
                </Flex>
              ))}
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
      </Flex>

      <Box borderWidth="1px" borderRadius="lg">
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
