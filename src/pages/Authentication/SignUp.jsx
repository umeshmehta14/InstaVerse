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
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts";
import { authBox, mainAuthContainer } from "../../styles/AuthenticationStyles";
import { toast } from "react-hot-toast";
import { SET_SHOW_PASSWORD, SET_SIGNUP_FORM } from "../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { signupHandler } from "./authenticationSlice";

export const SignUp = () => {
  document.title = "InstaVerse | SignUp";
  const { colorMode } = useColorMode();
  const { token } = useSelector((state) => state.authentication);

  const dispatch = useDispatch();

  const {
    userState: { showPassword, signupForm },
    userDispatch,
  } = useUser();
  const navigate = useNavigate();

  const { fullName, email, username, password, Cpassword } = signupForm;

  const handleSignup = (e) => {
    e.preventDefault();
    if (password === Cpassword) {
      if (password.length < 8) {
        toast.error("Password Have Atleast 8 Characters");
      } else {
        dispatch(signupHandler({ fullName, email, username, password }));
      }
    } else {
      toast.error("Password Does'nt Match");
    }
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
        <form onSubmit={handleSignup}>
          <HStack>
            <FormControl id="fullname" mb={4}>
              <FormLabel mb={"1"}>Full Name:</FormLabel>
              <Input
                type="text"
                placeholder="First name"
                value={fullName}
                required
                onChange={(event) =>
                  userDispatch({
                    type: SET_SIGNUP_FORM,
                    payload: {
                      ...signupForm,
                      fullName: event.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl id="username" mb={4}>
              <FormLabel mb={"1"}>User Name:</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                required
                onChange={(event) =>
                  userDispatch({
                    type: SET_SIGNUP_FORM,
                    payload: { ...signupForm, username: event.target.value },
                  })
                }
              />
            </FormControl>
          </HStack>

          <FormControl id="email" mb={4}>
            <FormLabel mb={"1"}>Email:</FormLabel>
            <Input
              type="text"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(event) =>
                userDispatch({
                  type: SET_SIGNUP_FORM,
                  payload: { ...signupForm, email: event.target.value },
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
                value={password}
                required
                onChange={(event) =>
                  userDispatch({
                    type: SET_SIGNUP_FORM,
                    payload: { ...signupForm, password: event.target.value },
                  })
                }
              />
              {password && (
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
          <FormControl id="c-password" mb={6}>
            <FormLabel>Confirm Password:</FormLabel>
            <InputGroup>
              <Input
                type={"password"}
                placeholder="Confirm password"
                value={Cpassword}
                required
                onChange={(event) =>
                  userDispatch({
                    type: SET_SIGNUP_FORM,
                    payload: { ...signupForm, Cpassword: event.target.value },
                  })
                }
              />
            </InputGroup>
          </FormControl>
          <VStack justifyContent={"space-between"}>
            <Button bg={"blue.500"} size="md" type="submit" w={"50%"}>
              Sign Up
            </Button>
          </VStack>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Link color="blue.500" onClick={() => navigate("/login")}>
            Log In
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};
