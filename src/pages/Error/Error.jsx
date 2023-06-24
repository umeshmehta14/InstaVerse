import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text, VStack, useColorMode } from "@chakra-ui/react";

export const Error = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  return (
    <VStack w="100%" my={"2rem"} gap={"2rem"}>
      <Text fontSize={"2rem"} textAlign={"center"}>
        Sorry, this page isn't available.
      </Text>
      <Box p={"1rem"}>
        <Text display={"inline"}>
          The link you followed may be broken, or the page may have been
          removed.
        </Text>
        <Text
          onClick={() => navigate("/")}
          color={colorMode === "dark" ? "blue.200" : "blue.500"}
          ml={"1"}
          display={"inline-block"}
        >
          Go back to InstaVerse.
        </Text>
      </Box>
    </VStack>
  );
};
