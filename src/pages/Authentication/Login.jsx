import React from 'react';
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
} from '@chakra-ui/react';

export const Login = () => {
  const { colorMode } = useColorMode();

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}>
      <Box
        p={8}
        mx="auto"
        maxW="400px"
        borderWidth={1}
        borderRadius="md"
        boxShadow="lg"
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
      >
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Instagram
        </Heading>
        <form onSubmit={handleLogin}>
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" />
          </FormControl>
          <FormControl id="password" mb={6}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type="password" placeholder="Enter your password" />
              <InputRightElement>
                <Button size="sm" onClick={() => console.log('Forgot password')}>
                  Forgot?
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="teal" size="lg" type="submit" width="full">
            Log In
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Don't have an account?{' '}
          <Link color="teal.500" onClick={() => console.log('Sign up')}>
            Sign up
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};
