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

import { useAuth, useUser } from "../../contexts";
import { authBox, mainAuthContainer } from "../../styles/AuthenticationStyles";
import { toast } from "react-hot-toast";
import { SET_SHOW_PASSWORD, SET_SIGNUP_FORM } from "../../utils/Constants";

export const SignUp = () => {
  document.title = "InstaVerse | Login";
  const { colorMode } = useColorMode();

  const { signUpHandler, token } = useAuth();
  const {
    userState: { showPassword, signupForm },
    userDispatch,
  } = useUser();
  const navigate = useNavigate();

  const { firstName, lastName, username, password, Cpassword } = signupForm;

  const handleSignup = (e) => {
    e.preventDefault();
    if (password === Cpassword) {
      if (password.length < 8) {
        toast.error("Password Have Atleast 8 Characters");
      } else {
        signUpHandler(firstName, lastName, username, password);
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
            <FormControl id="firstname" mb={4}>
              <FormLabel mb={"1"}>First Name:</FormLabel>
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                required
                onChange={(event) =>
                  userDispatch({
                    type: SET_SIGNUP_FORM,
                    payload: {
                      ...signupForm,
                      firstName: event.target.value,
                    },
                  })
                }
              />
            </FormControl>
            <FormControl id="lastname" mb={4}>
              <FormLabel mb={"1"}>Last Name:</FormLabel>
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                required
                onChange={(event) =>
                  userDispatch({
                    type: SET_SIGNUP_FORM,
                    payload: { ...signupForm, lastName: event.target.value },
                  })
                }
              />
            </FormControl>
          </HStack>

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
