import React, { useEffect, useState } from "react";
import "./auth.css";
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
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { authBox, mainAuthContainer } from "../../styles/AuthenticationStyles";
import { useDispatch, useSelector } from "react-redux";
import { signupHandler } from "./authenticationSlice";
import { updateShowPassword, updateSignupForm } from "./authenticationSlice.js";

export const SignUp = () => {
  document.title = "InstaVerse | SignUp";
  const { colorMode } = useColorMode();
  const { token, signupForm, showPassword } = useSelector(
    (state) => state.authentication
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fullName, email, username, password } = signupForm;
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(signupHandler({ fullName, email, username, password }));
    dispatch(
      updateSignupForm({
        fullName: "",
        email: "",
        username: "",
        password: "",
      })
    );
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (fullName && password.length >= 8 && email && username) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [fullName, email, username, password]);

  return (
    <Flex {...mainAuthContainer}>
      <Box {...authBox} bg={colorMode === "light" ? "white.500" : "black.900"}>
        <Heading
          fontFamily={"Pacifico, cursive"}
          title="InstaVerse"
          align={"center"}
          color={"gray"}
          my={"4"}
        >
          InstaVerse
        </Heading>
        <Text
          textAlign={"center"}
          margin={"1rem 0"}
          padding={"0 1rem"}
          color={"gray"}
        >
          Sign up to see photos and videos from your friends.
        </Text>
        <Divider mb={"1rem"} />
        <form onSubmit={handleSignup}>
          <FormControl
            id="email"
            mb={4}
            className={`floating-label-input ${email ? "filled" : ""}`}
          >
            <FormLabel className="floating-label">Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(event) =>
                dispatch(
                  updateSignupForm({ ...signupForm, email: event.target.value })
                )
              }
              className="floating-input"
            />
          </FormControl>
          <FormControl
            id="fullname"
            mb={4}
            className={`floating-label-input ${fullName ? "filled" : ""}`}
          >
            <FormLabel className="floating-label">Full Name</FormLabel>
            <Input
              type="text"
              value={fullName}
              onChange={(event) =>
                dispatch(
                  updateSignupForm({
                    ...signupForm,
                    fullName: event.target.value,
                  })
                )
              }
              className="floating-input"
            />
          </FormControl>

          <FormControl
            id="username"
            mb={4}
            className={`floating-label-input ${username ? "filled" : ""}`}
          >
            <FormLabel className="floating-label">Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(event) =>
                dispatch(
                  updateSignupForm({
                    ...signupForm,
                    username: event.target.value,
                  })
                )
              }
              className="floating-input"
            />
          </FormControl>

          <FormControl
            id="password"
            mb={6}
            className={`floating-label-input ${password ? "filled" : ""}`}
          >
            <FormLabel className="floating-label">Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                required
                onChange={(event) =>
                  dispatch(
                    updateSignupForm({
                      ...signupForm,
                      password: event.target.value,
                    })
                  )
                }
                className="floating-input"
              />
              {password && (
                <InputRightElement
                  cursor={"pointer"}
                  fontSize={"sm"}
                  onClick={() => dispatch(updateShowPassword())}
                >
                  {showPassword ? "Hide" : "Show"}
                </InputRightElement>
              )}
            </InputGroup>
          </FormControl>
          <Text
            fontSize={"12px"}
            color={"grey"}
            textAlign={"center"}
            margin={"1rem 0"}
            padding={"0 1rem"}
          >
            People who use our service may have uploaded your contact
            information to Instaverse.{" "}
          </Text>
          <VStack justifyContent={"space-between"}>
            <Button
              bg={isButtonDisabled ? "gray" : "blue.500"}
              cursor={isButtonDisabled ? "default" : "pointer"}
              type="submit"
              w={"100%"}
              color={"white"}
              borderRadius={"12px"}
              disabled={isButtonDisabled}
            >
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
      <Text textAlign="center" {...authBox} padding={"1rem 2rem"}>
        Already have an account?{" "}
        <Link color="blue.500" onClick={() => navigate("/login")}>
          Log In
        </Link>
      </Text>
    </Flex>
  );
};
