import React, { useEffect } from "react";
import { Flex, VStack } from "@chakra-ui/react";

import { PostBox, UserSuggestion } from "../../components";
import { usePost, useUser } from "../../contexts";
import { heroContentBox } from "../../styles/GlobalStyles";
import { postFilter } from "../../utils/PostFilter";
import { SET_DEFAULT_TAB, SET_FILTER, SET_PAGE } from "../../utils/Constants";

export const Explore = () => {
  const {
    postDispatch,
    postState: { posts, filter, page },
  } = usePost();
  const { userDispatch } = useUser();

  const ExplorePosts = postFilter(posts, filter);

  useEffect(() => {
    postDispatch({ type: SET_FILTER, payload: "latest" });
    postDispatch({ type: SET_PAGE, payload: 1 });
    userDispatch({ type: SET_DEFAULT_TAB, payload: 0 });
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
