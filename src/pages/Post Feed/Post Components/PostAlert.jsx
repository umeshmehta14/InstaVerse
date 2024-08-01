import { Alert, AlertIcon, Text } from "@chakra-ui/react";
import React from "react";

export const PostAlert = () => {
  return (
    <Alert
      status="info"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
    >
      <AlertIcon boxSize={6} />
      <Text fontSize="lg" fontWeight="bold" mt={2}>
        All Caught Up!
      </Text>
      <Text fontSize="sm">You have seen all the posts.</Text>
    </Alert>
  );
};
