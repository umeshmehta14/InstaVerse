import React from "react";
import { useUser } from "../../contexts";
import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import {
  userSuggestionAllProfileBox,
  userSuggestionContainer,
  userSuggestionMainProfile,
} from "../../styles/UserSuggestionStyles";

export const UserSuggestion = () => {

  const {
    userState: { users },
  } = useUser();

  return (
    <Box {...userSuggestionContainer}>
      <Flex {...userSuggestionMainProfile}>
        <Avatar
          size="lg"
          name="Christian Nwamba"
          src="https://bit.ly/code-beast"
        />
        <Text fontWeight={"normal"}>Profile</Text>
      </Flex>
      <Box borderWidth="1px" borderRadius="lg">
        <Flex p="3" align="center">
          <Text fontWeight="semibold" mx={"auto"}>
            Suggested For You
          </Text>
        </Flex>

        <Flex
          flexDir={{ base: "row", lg: "column" }}
          w={{ base: "100vw", md: "auto" }}
          overflow={"auto"}
          overflowX={{ base: "auto", md: "hidden" }}
        >
          {users.map((user) => (
            <Flex key={user._id} {...userSuggestionAllProfileBox}>
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                align={"center"}
                gap={"0.5rem"}
              >
                <Avatar
                  size={{ base: "md", md: "sm" }}
                  name={user.firstName}
                  src={user.avatarURL}
                />
                <Box>
                  <Text fontSize="sm">{user.username}</Text>
                </Box>
              </Flex>
              <Button variant={"link-button"} size="sm" colorScheme="blue">
                Follow
              </Button>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
