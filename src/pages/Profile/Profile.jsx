import React from "react";
import {
  Flex,
  Box,
  Avatar,
  Text,
  Button,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";

export const Profile = () => {
  return (
    <Flex direction="column" align="center" p={4}>
      <Box mb={4}>
        <Avatar
          size="xl"
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
        />
      </Box>

      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        Username
      </Text>

      <Text fontSize="lg" color="gray.500" mb={4}>
        Bio
      </Text>

      <Flex>
        <Button variant="outline" size="sm" mr={2}>
          Edit Profile
        </Button>
        <Button variant="outline" size="sm">
          Logout
        </Button>
      </Flex>

      <Divider my={4} />

      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {/* Placeholder for grid items */}
        <GridItem colSpan={3}>
          <Box w="full" h="200px" bg="gray.200"></Box>
        </GridItem>
        <GridItem>
          <Box w="full" h="200px" bg="gray.200"></Box>
        </GridItem>
        <GridItem>
          <Box w="full" h="200px" bg="gray.200"></Box>
        </GridItem>
        {/* End of placeholder */}
      </Grid>
    </Flex>
  );
};