import React, { useEffect, useState } from "react";
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
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  authBox,
  mainAuthContainer,
} from "../../../styles/AuthenticationStyles";
import { loginHandler, updateButtonDisable } from "../authenticationSlice";
import { updateLoginForm, updateShowPassword } from "../authenticationSlice.js";
import "../auth.css";

export const Login = () => {
  document.title = "InstaVerse | Login";

  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, loginForm, showPassword, buttonDisable } = useSelector(
    (state) => state.authentication
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (!buttonDisable) {
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
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (loginForm.identifier && loginForm.password.length >= 8) {
      dispatch(updateButtonDisable(false));
    } else {
      dispatch(updateButtonDisable(true));
    }
  }, [loginForm.identifier, loginForm.password]);

  return (
    <Flex {...mainAuthContainer}>
      <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
        <Heading
          fontFamily={"Pacifico, cursive"}
          title="InstaVerse"
          align={"center"}
          color={colorMode === "light" ? "#262626" : "gray"}
          mb={"12"}
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
              onChange={(event) =>
                dispatch(
                  updateLoginForm({
                    ...loginForm,
                    identifier: event.target.value,
                  })
                )
              }
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
            <Button
              size="md"
              bg={buttonDisable ? "gray" : "blue.500"}
              cursor={buttonDisable ? "default" : "pointer"}
              type="submit"
              w={"100%"}
              color={"white"}
              borderRadius={"12px"}
              disabled={buttonDisable}
            >
              Log In
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center" fontSize={"12px"}>
          <Link
            color="blue.500"
            onClick={() => navigate("/accounts/password/emailConfirmation/")}
          >
            Forgot password?
          </Link>
        </Text>
      </Box>
      <Text textAlign="center" {...authBox} padding={"1rem 2rem"}>
        Don't have an account?{" "}
        <Link color="blue.500" onClick={() => navigate("/signup")}>
          Sign up
        </Link>
      </Text>
    </Flex>
  );
};

{
  /* <Button
              variant={"white-button"}
              w={"100%"}
              borderRadius={"12px"}
              onClick={onOpen}
            >
              Login As
            </Button> */
}

{
  /*
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
          </Modal> */
}
