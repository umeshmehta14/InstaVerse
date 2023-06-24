import React, { useEffect, useRef, useState } from "react";
import { Alert, AlertIcon, Flex, Text, VStack } from "@chakra-ui/react";

import { PostBox, RotatingLoader, UserSuggestion } from "../../components";
import { useAuth, usePost, useUser } from "../../contexts";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyMessageStyle, heroContentBox } from "../../styles/GlobalStyles";
import { postFilter } from "../../utils/PostFilter";
import { SET_DEFAULT_TAB, SET_FILTER, SET_PAGE } from "../../utils/Constants";

export const PostFeed = () => {
  const {
    postState: { posts, filter, page },
    postDispatch,
  } = usePost();
  const { userDispatch } = useUser();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const bottomRef = useRef(null);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const allPost =
    location?.pathname === "/explore"
      ? posts
      : posts?.filter(
          ({ username }) =>
            currentUser.username === username ||
            currentUser.following?.some(
              (followingUser) => followingUser.username === username
            )
        );

  const displayedPosts = postFilter(allPost, filter).slice(0, page * 5);

  const handleObserver = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsPostLoading(true);
      postDispatch({ type: SET_PAGE, payload: page + 1 });
    } else {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    if (displayedPosts.length > 0) {
      const elementRef = bottomRef?.current;
      const observer = new IntersectionObserver(handleObserver);
      if (elementRef) observer?.observe(elementRef);

      return () => {
        observer?.unobserve(elementRef);
      };
    }
  }, [page]);

  useEffect(() => {
    let timeoutId;

    if (isPostLoading) {
      timeoutId = setTimeout(() => {
        setIsPostLoading(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPostLoading, displayedPosts]);

  useEffect(() => {
    if (location?.pathname.includes("/post/")) {
    } else {
      window.scrollTo({ top: 0 });
      postDispatch({ type: SET_PAGE, payload: 1 });
    }
    if (location?.pathname === "/explore") {
      postDispatch({ type: SET_FILTER, payload: "latest" });
    }
    userDispatch({ type: SET_DEFAULT_TAB, payload: 0 });
  }, [location?.pathname, userDispatch]);

  return (
    <Flex sx={heroContentBox}>
      <UserSuggestion />
      {displayedPosts?.length === 0 ? (
        <Flex {...emptyMessageStyle}>
          <Text w={"100%"}>
            No posts yet. You can go to
            <Text
              onClick={() => navigate("/explore")}
              cursor={"pointer"}
              textDecor={"underline"}
              display={"inline-block"}
              ml={"2"}
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
          {displayedPosts?.map((post, index) => {
            return (
              <React.Fragment key={post?._id}>
                <PostBox post={post} />
                {index === displayedPosts?.length - 1 && (
                  <div ref={bottomRef} style={{ height: 0 }} />
                )}
              </React.Fragment>
            );
          })}
          {displayedPosts?.length === allPost?.length ||
            (isPostLoading && <RotatingLoader w={"50"} sw={"7"} />)}
          {displayedPosts?.length === allPost?.length && (
            <Alert
              status="info"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
            >
              <AlertIcon boxSize={6} />
              <Text fontSize="lg" fontWeight="bold" mt={2}>
                All Caught Up!
              </Text>
              <Text fontSize="sm">You have seen all the posts.</Text>
            </Alert>
          )}
        </VStack>
      )}
    </Flex>
  );
};
