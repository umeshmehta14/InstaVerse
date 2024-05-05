import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorMode,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts";
import { authBox, mainAuthContainer } from "../../styles/AuthenticationStyles";
import { SET_LOGIN_FORM, SET_SHOW_PASSWORD } from "../../utils/Constants";
import { loginHandler } from "./authenticationSlice";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {
  document.title = "InstaVerse | Login";

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    userState: { users, loginForm, showPassword },
    userDispatch,
  } = useUser();
  // const { handleGuestLogin } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authentication);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      loginHandler({
        identifier: loginForm?.username,
        password: loginForm?.password,
      })
    );
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Flex {...mainAuthContainer}>
      <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
        <Heading
          fontFamily={"Pacifico, cursive"}
          title="InstaVerse"
          align={"center"}
          color={"gray"}
          mb={"2"}
        >
          InstaVerse
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl id="username" mb={4}>
            <FormLabel mb={"1"}>User Name:</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={loginForm.username}
              required
              onChange={(event) =>
                userDispatch({
                  type: SET_LOGIN_FORM,
                  payload: { ...loginForm, username: event.target.value },
                })
              }
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={loginForm.password}
                required
                onChange={(event) =>
                  userDispatch({
                    type: SET_LOGIN_FORM,
                    payload: { ...loginForm, password: event.target.value },
                  })
                }
              />
              {loginForm.password && (
                <InputRightElement
                  cursor={"pointer"}
                  fontSize={"sm"}
                  onClick={() => userDispatch({ type: SET_SHOW_PASSWORD })}
                >
                  {showPassword ? "Hide" : "Show"}
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
          <VStack justifyContent={"space-between"}>
            <Button bg={"blue.500"} size="md" type="submit" w={"50%"}>
              Log In
            </Button>
            <Button variant={"white-button"} onClick={onOpen}>
              Login As
            </Button>
          </VStack>

          <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent
              bg={colorMode === "light" ? "white.500" : "black.900"}
            >
              <ModalHeader>Guest Users</ModalHeader>
              <ModalCloseButton _hover={{ bg: "red", color: "white" }} />
              <ModalBody>
                {users.map((user) => (
                  <Flex
                    gap={"2"}
                    cursor={"pointer"}
                    align={"center"}
                    p="2"
                    onClick={() => handleGuestLogin(user)}
                    borderRadius={"12px"}
                    _hover={{ bg: "gray.100" }}
                  >
                    <Avatar
                      size="sm"
                      name={user?.firstName}
                      src={user?.avatarURL}
                    />
                    {user?.username}
                  </Flex>
                ))}
              </ModalBody>
            </ModalContent>
          </Modal>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link color="blue.500" onClick={() => navigate("/signup")}>
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};
