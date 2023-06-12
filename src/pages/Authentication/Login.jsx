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
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";

export const Login = () => {
  const { colorMode } = useColorMode();

  const { loginHandler, token, logoutHandler } = useAuth();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  document.title = "Login";


  const handleLogin = (e) => {
    e.preventDefault();
    loginHandler(loginForm.username, loginForm.password);
  };

  useEffect(() => {
    if (token) {
      navigate( "/");
    }
  }, []);

  return (
    <Flex
      minHeight="100vh"
      w={"100vw"}
      align="center"
      justify="center"
    >
      <Box
        p={8}
        mx="auto"
        maxW="400px"
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        bg={colorMode === "light" ? "white.500" : "black.900"}
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
        <form onSubmit={handleLogin}>
          <FormControl id="email" mb={4}>
            <FormLabel mb={"1"}>username:</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={loginForm.username}
              required
              onChange={(event) =>
                setLoginForm({ ...loginForm, username: event.target.value })
              }
            />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
              <Input
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                required
                onChange={(event) =>
                  setLoginForm({ ...loginForm, password: event.target.value })
                }
              />
              <InputRightElement>
                  show
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="facebook" size="lg" type="submit" width="full">
            Log In
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link color="blue.500" onClick={() => console.log("Sign up")}>
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};
