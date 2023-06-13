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
import { useAuth } from "../../contexts";

export const SignUp = () => {
  document.title = "InstaVerse | Login";
  const { colorMode } = useColorMode();

  const { signUpHandler, token } = useAuth();
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    fistName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const {firstName, lastName, username, password} = signupForm;

  const handleSignup = (e) => {
    e.preventDefault();
    signUpHandler(firstName, lastName, username, password);
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <Flex
      minHeight="100vh"
      w={"100vw"}
      align="center"
      justify="center"
      overflowY={"hidden"}
    >
      <Box
        p={8}
        mx="auto"
        maxW="400px"
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        bg={colorMode === "light" ? "white.500" : "black.900"}
        overflow="hidden"
      >
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
          <FormControl id="firstname" mb={4}>
            <FormLabel mb={"1"}>firstName:</FormLabel>
            <Input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              required
              onChange={(event) =>
                setSignupForm({ ...signupForm, firstName: event.target.value })
              }
            />
          </FormControl>
          <FormControl id="lastname" mb={4}>
            <FormLabel mb={"1"}>Last Name:</FormLabel>
            <Input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              required
              onChange={(event) =>
                setSignupForm({ ...signupForm, lastName: event.target.value })
              }
            />
          </FormControl>
          <FormControl id="username" mb={4}>
            <FormLabel mb={"1"}>username:</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              required
              onChange={(event) =>
                setSignupForm({ ...signupForm, username: event.target.value })
              }
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                required
                onChange={(event) =>
                  setSignupForm({ ...signupForm, password: event.target.value })
                }
              />
              <InputRightElement>show</InputRightElement>
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
