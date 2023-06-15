import React from "react";

import { PostBox, UserSuggestion } from "../../components";
import { Flex, VStack } from "@chakra-ui/react";
import { usePost } from "../../contexts";
import { useEffect } from "react";
import { heroContentBox } from "../../styles/GlobalStyles";

export const Explore = () => {
  const {
    postState: { posts },
  } = usePost();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Flex {...heroContentBox}>
      <UserSuggestion />
      <VStack
        w={{ base: "100%", lg: "auto" }}
        alignItems={"center"}
        minW={{ md: "468px" }}
      >
        {posts.map((post) => (
          <PostBox key={post._id} post={post} />
        ))}
      </VStack>
    </Flex>
  );
};
