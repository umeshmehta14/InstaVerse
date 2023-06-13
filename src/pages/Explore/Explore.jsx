import React from "react";

import { PostBox, UserSuggestion } from "../../components";
import { Flex, VStack } from "@chakra-ui/react";
import { useAuth, usePost } from "../../contexts";

export const Explore = () => {
  const {
    postState: { posts },
  } = usePost();
  const { currentUser } = useAuth();

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
      <VStack w={{base:"100%",lg:"auto"}} alignItems={"center"} minW={{md:"468px"}}>
        {posts.map((post) => (
          <PostBox key={post._id} post={post} />
        ))}
      </VStack>
    </Flex>
  );
};

