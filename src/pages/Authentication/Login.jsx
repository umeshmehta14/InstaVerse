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
import { useDispatch, useSelector } from "react-redux";

import { authBox, mainAuthContainer } from "../../styles/AuthenticationStyles";
import { GUEST_USER_PASSWORD } from "../../utils/Constants";
import { loginHandler } from "./authenticationSlice";
import TailSpinLoader from "../../components/Loader/TailSpinLoader";
import { updateLoginForm, updateShowPassword } from "../Post Feed/userSlice";
import "./auth.css";
import { color } from "framer-motion";

export const Login = () => {
  document.title = "InstaVerse | Login";

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authentication);
  const { guestUsers, isLoading, loginForm, showPassword } = useSelector(
    (state) => state.user
  );

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      loginHandler({
        identifier: loginForm?.identifier,
        password: loginForm?.password,
      })
    );
    dispatch(
      updateLoginForm({
        identifier: "",
        password: "",
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
          <FormControl
            id="identifier"
            mb={4}
            className={`floating-label-input ${
              loginForm.identifier ? "filled" : ""
            }`}
          >
            <FormLabel className="floating-label">Username or Email</FormLabel>
            <Input
              type="text"
              value={loginForm.identifier}
              required
              onChange={(event) =>
                dispatch(
                  updateLoginForm({
                    ...loginForm,
                    identifier: event.target.value,
                  })
                )
              }
              className="floating-input"
            />
          </FormControl>
          <FormControl
            id="password"
            mb={6}
            className={`floating-label-input ${
              loginForm.password ? "filled" : ""
            }`}
          >
            <FormLabel className="floating-label">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={loginForm.password}
                required
                onChange={(event) =>
                  dispatch(
                    updateLoginForm({
                      ...loginForm,
                      password: event.target.value,
                    })
                  )
                }
                className="floating-input"
              />
              {loginForm.password && (
                <InputRightElement
                  cursor={"pointer"}
                  fontSize={"sm"}
                  _hover={{ color: "gray" }}
                  onClick={() => dispatch(updateShowPassword())}
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
              minH={"560px"}
              border={"1px solid #5454548f"}
            >
              <ModalHeader>Guest Users</ModalHeader>
              <ModalCloseButton _hover={{ bg: "red", color: "white" }} />
              <ModalBody>
                {isLoading ? (
                  <TailSpinLoader />
                ) : (
                  guestUsers?.map((user) => (
                    <Flex
                      key={user?._id}
                      gap={"2"}
                      cursor={"pointer"}
                      align={"center"}
                      p="2"
                      onClick={() =>
                        dispatch(
                          loginHandler({
                            identifier: user?.username,
                            password: GUEST_USER_PASSWORD,
                          })
                        )
                      }
                      borderRadius={"12px"}
                      _hover={{ bg: "gray.100" }}
                    >
                      <Avatar
                        size="sm"
                        name={user?.fullName}
                        src={user?.avatar?.url}
                      />
                      {user?.username}
                    </Flex>
                  ))
                )}
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
