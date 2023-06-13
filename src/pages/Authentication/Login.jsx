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
import { useAuth, useUser } from "../../contexts";

export const Login = () => {
  document.title = "InstaVerse | Login";
  const { colorMode } = useColorMode();
  const {
    userState: { users },
  } = useUser();
  const { loginHandler, token } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleGuestLogin = (user) => {
    loginHandler(user?.username, user?.password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginHandler(loginForm?.username, loginForm?.password);
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
              <InputRightElement>show</InputRightElement>
            </InputGroup>
          </FormControl>
          <VStack justifyContent={"space-between"}>
          <Button bg={"blue.500"} size="md" type="submit" w={"50%"}>
            Log In
          </Button>
          <Button variant={"white-button"} onClick={onOpen}>Login As</Button>
          </VStack>

          <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent bg={colorMode === "light"? "white.500":"black.900"}>
              <ModalHeader>Guest Users</ModalHeader>
              <ModalCloseButton _hover={{bg:"red", color:"white"}}/>
              <ModalBody >
                {users.map((user) => (
                  <Flex
                    gap={"2"}
                    cursor={"pointer"}
                    align={"center"}
                    p="2"
                    onClick={() => handleGuestLogin(user)}
                    borderRadius={"12px"}
                    _hover={{bg:"gray.100"}}
                  >
                    <Avatar size="sm" name={user?.firstName} src={user?.avatarURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"} />
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
