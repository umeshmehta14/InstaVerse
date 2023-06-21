import React, { useEffect } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";

import { PostBox, UserSuggestion } from "../../components";
import { useAuth, usePost, useUser } from "../../contexts";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyMessageStyle, heroContentBox } from "../../styles/GlobalStyles";
import { postFilter } from "../../utils/PostFilter";
import { SET_DEFAULT_TAB } from "../../utils/Constants";

export const Home = () => {
  const {
    postState: { posts, filter },
  } = usePost();
  const { userDispatch } = useUser();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const homePagePosts = posts?.filter(
    ({ username }) =>
      currentUser.username === username ||
      currentUser.following?.some(
        (followingUser) => followingUser.username === username
      )
  );

  const displayedPosts = postFilter(homePagePosts, filter);

  useEffect(() => {
    if (location?.pathname.includes("/post/")) {
    } else {
      window.scrollTo({ top: 0 });
    }
    userDispatch({ type: SET_DEFAULT_TAB, payload: 0 });
  }, [location?.pathname, userDispatch]);

  return (
    <Flex sx={heroContentBox}>
      <UserSuggestion />
      {displayedPosts?.length === 0 ? (
        <Flex {...emptyMessageStyle}>
          <Text>
            No posts yet. You can go
            <Text
              onClick={() => navigate("/explore")}
              cursor={"pointer"}
              textDecor={"underline"}
            >
              Explore Feed
            </Text>
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
