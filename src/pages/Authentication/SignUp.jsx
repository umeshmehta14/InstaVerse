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
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { authBox, mainAuthContainer } from "../../styles/AuthenticationStyles";
import { toast } from "react-hot-toast";

export const SignUp = () => {
  document.title = "InstaVerse | Login";
  const { colorMode } = useColorMode();

  const { signUpHandler, token } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signupForm, setSignupForm] = useState({
    fistName: "",
    lastName: "",
    username: "",
    password: "",
    Cpassword: "",
  });

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
                  setSignupForm({
                    ...signupForm,
                    firstName: event.target.value,
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
                  setSignupForm({ ...signupForm, lastName: event.target.value })
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
                setSignupForm({ ...signupForm, username: event.target.value })
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
                  setSignupForm({ ...signupForm, password: event.target.value })
                }
              />
              {password && (
                <InputRightElement
                  cursor={"pointer"}
                  fontSize={"sm"}
                  onClick={() => setShowPassword(!showPassword)}
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
                  setSignupForm({
                    ...signupForm,
                    Cpassword: event.target.value,
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
