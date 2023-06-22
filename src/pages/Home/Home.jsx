import React, { useEffect, useRef, useState } from "react";
import { Alert, AlertIcon, Flex, Text, VStack } from "@chakra-ui/react";

import { PostBox, RotatingLoader, UserSuggestion } from "../../components";
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

  const bottomRef = useRef(null);
  const [page, setPage] = useState(1);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const homePagePosts = posts?.filter(
    ({ username }) =>
      currentUser.username === username ||
      currentUser.following?.some(
        (followingUser) => followingUser.username === username
      )
  );
  const displayedPosts = postFilter(homePagePosts, filter).slice(0, page * 5);
  console.log(homePagePosts);
  console.log(page);
  console.log(displayedPosts);

  const handleObserver = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsPostLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const elementRef = bottomRef.current;
    const observer = new IntersectionObserver(handleObserver);
    if (elementRef) observer.observe(elementRef);

    return () => {
      observer.unobserve(elementRef);
    };
  }, []);

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
  }, [isPostLoading]);

  useEffect(() => {
    if (location?.pathname.includes("/post/")) {
    } else {
      window.scrollTo({ top: 0 });
    }
    // setPage(1);
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
          {displayedPosts?.map((post, index) => {
            return (
              <React.Fragment key={post?._id}>
                <PostBox post={post} />
                {index === displayedPosts.length - 1 && (
                  <div ref={bottomRef} style={{ height: 0 }} />
                )}
                {index === displayedPosts?.length - 1 &&
                  displayedPosts?.length === homePagePosts?.length &&
                  isPostLoading && <RotatingLoader w={"50"} sw={"9"} />}
              </React.Fragment>
            );
          })}
          {displayedPosts?.length === homePagePosts?.length && (
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
