import React, { useEffect } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";

import { PostBox, UserSuggestion } from "../../components";
import { useAuth, usePost } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { heroContentBox } from "../../styles/GlobalStyles";
import { postFilter } from "../../utils/PostFilter";

export const Home = () => {
  const {
    postState: { posts, filter },
  } = usePost();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const homePagePosts = posts?.filter(
    ({ username }) =>
      currentUser.username === username ||
      currentUser.following?.some(
        (followingUser) => followingUser.username === username
      )
  );

  const displayedPosts = postFilter(homePagePosts, filter);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Flex sx={heroContentBox}>
      <UserSuggestion />
      {displayedPosts?.length === 0 ? (
        <Flex
          justifyContent={"center"}
          h="70%"
          textAlign={"center"}
          align={"center"}
          fontSize={"2xl"}
          gap={"0.5rem"}
        >
          <Text>No posts yet. You can go</Text>{" "}
          <Text
            onClick={() => navigate("/explore")}
            cursor={"pointer"}
            textDecor={"underline"}
          >
            Explore Feed
          </Text>
        </Flex>
      ) : (
        <VStack
          w={{ base: "100%", lg: "auto" }}
          alignItems={"center"}
          minW={{ md: "468px" }}
        >
          {displayedPosts?.map((post) => (
            <PostBox key={post._id} post={post} />
          ))}
        </VStack>
      )}
    </Flex>
  );
};
