import React from "react";

import { PostBox, UserSuggestion } from "../../components";
import { Flex, VStack } from "@chakra-ui/react";
import { usePost } from "../../contexts";
import { useEffect } from "react";
import { heroContentBox } from "../../styles/GlobalStyles";
import { postFilter } from "../../utils/PostFilter";
import { SET_FILTER } from "../../utils/Constants";

export const Explore = () => {
  const {
    postDispatch,
    postState: { posts, filter },
  } = usePost();

  const ExplorePosts = postFilter(posts, filter);

  useEffect(() => {
    postDispatch({ type: SET_FILTER, payload: "latest" });
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Flex sx={heroContentBox}>
      <UserSuggestion />
      <VStack
        w={{ base: "100%", lg: "auto" }}
        alignItems={"center"}
        minW={{ md: "468px" }}
      >
        {ExplorePosts.map((post) => (
          <PostBox key={post._id} post={post} />
        ))}
      </VStack>
    </Flex>
  );
};
