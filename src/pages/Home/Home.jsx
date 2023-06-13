import React from "react";
import { Flex, VStack } from "@chakra-ui/react";

import { PostBox, UserSuggestion } from "../../components";
import { useAuth, usePost } from "../../contexts";

export const Home = () => {
  const {
    postState: { posts },
  } = usePost();
  const { currentUser } = useAuth();

  const homePagePosts = posts.filter(
    ({ username }) =>
      currentUser.username === username ||
      currentUser.following.some(
        (followingUser) => followingUser.username === username
      )
  );

  return (
    <Flex
      gap={"1rem"}
      w="100%"
      flexDir={{ base: "column", lg: "row-reverse" }}
      justifyContent={"center"}
      mt={"1rem"}
      alignItems={{ base: "center", lg: "flex-start" }}
    >
      <UserSuggestion />
      {homePagePosts.length === 0 ? (
        <Flex
          justifyContent={"center"}
          h="70%"
          textAlign={"center"}
          align={"center"}
          fontSize={"2xl"}
        >
          No posts yet. You can go Explore Feed
        </Flex>
      ) : (
        <VStack
          w={{ base: "100%", lg: "auto" }}
          alignItems={"center"}
          minW={{ md: "468px" }}
        >
          {homePagePosts.map((post) => (
            <PostBox key={post._id} post={post} />
          ))}
        </VStack>
      )}
    </Flex>
  );
};
