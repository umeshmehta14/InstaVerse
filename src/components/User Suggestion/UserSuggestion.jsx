import React from 'react'
import { usePost } from '../../contexts';
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';

export const UserSuggestion = () => {
    const {
        state: { users },
      } = usePost();

  return (
    <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={{ lg: "30%" }}
        maxW={{ base: "468px", lg: "300px" }}
        h={"fit-content"}
      >
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
            <Flex
              p="3"
              align="center"
              key={user._id}
              flexDir={{ base: "column", lg: "row" }}
              minW={{ base: "130px", lg: "auto" }}
              rowGap={"0.5rem"}
              outline={{ base: "0.5px solid gray", lg: "none" }}
              justifyContent={"space-between"}
            >
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
  )
}

