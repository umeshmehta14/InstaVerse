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
import {
  loginHandler,
  updateButtonDisable,
  updateConfirmationCode,
} from "../authenticationSlice";
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
            onClick={() => {
              dispatch(
                updateLoginForm({
                  identifier: "",
                  password: "",
                })
              );
              dispatch(updateConfirmationCode(""));
              navigate("/accounts/password/emailConfirmation/");
            }}
          >
            Forgot password?
          </Link>
        </Text>
      </Box>
      <Text textAlign="center" {...authBox} padding={"1rem 2rem"}>
        Don't have an account?{" "}
        <Link
          color="blue.500"
          onClick={() => {
            dispatch(
              updateLoginForm({
                identifier: "",
                password: "",
              })
            );
            dispatch(updateConfirmationCode(""));
            navigate("/signup");
          }}
        >
          Sign up
        </Link>
      </Text>
    </Flex>
  );
};
