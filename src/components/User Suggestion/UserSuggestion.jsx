import React from "react";
import { useAuth, useUser } from "../../contexts";
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
  const { currentUser } = useAuth();

  const suggestedUser = users?.filter(
    (user) =>
      user._id !== currentUser?._id &&
      !currentUser?.following?.some(
        ({ username }) => username === user.username
      )
  );

  return (
    <Box {...userSuggestionContainer}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        display={{ base: "none", lg: "flex" }}
      >
        <Flex
          {...userSuggestionMainProfile}
          title={currentUser.username}
          cursor={"pointer"}
        >
          <Avatar
            size="lg"
            name={currentUser.username}
            src={currentUser.avatarURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"}
          />
          <Text fontWeight={"normal"} justifySelf={"flex-end"}>
            {currentUser.username}
          </Text>
        </Flex>
        <Button variant={"link-button"}>Switch</Button>
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
          maxW={"100%"}
        >
          {suggestedUser?.map((user) => (
            <Flex key={user._id} {...userSuggestionAllProfileBox}>
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                align={"center"}
                gap={"0.5rem"}
                title={user.username}
              >
                <Avatar
                  size={{ base: "md", md: "sm" }}
                  name={user.firstName}
                  src={user.avatarURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnAeY_IFrsiUIvvfnSvAcmrdoNUprysMGfCQ&usqp=CAU"}
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
