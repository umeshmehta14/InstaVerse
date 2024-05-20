import React, { useEffect, useRef } from "react";
import { Alert, AlertIcon, Flex, Text, VStack } from "@chakra-ui/react";

import { PostBox, RotatingLoader, UserSuggestion } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyMessageStyle, heroContentBox } from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomePosts,
  updateCurrentPage,
  updateNewPostLoading,
} from "./postSlice";

export const PostFeed = () => {
  const { posts, totalPages, currentPage, newPostLoading } = useSelector(
    (state) => state.post
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  document.title = `InstaVerse | ${
    location?.pathname === "/explore" ? "Explore" : "Home"
  }`;

  const bottomRef = useRef(null);

  const handleObserver = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      dispatch(updateNewPostLoading());
      dispatch(getHomePosts({ page: currentPage + 1 }));
    }
  };

  useEffect(() => {
    console.log("before hitted");
    if (posts?.length > 0 && currentPage !== totalPages) {
      console.log("hitted");
      const elementRef = bottomRef?.current;
      const observer = new IntersectionObserver(handleObserver);
      if (elementRef) observer?.observe(elementRef);

      return () => {
        if (elementRef) observer.unobserve(elementRef);
      };
    }
  }, [posts, currentPage, totalPages]);

  useEffect(() => {
    dispatch(getHomePosts({ page: 1 }));
    if (!location?.pathname.includes("/post/")) {
      dispatch(updateCurrentPage(1));
    }
    window.scrollTo({ top: 0 });
  }, [location?.pathname, dispatch]);

  return (
    <Flex sx={heroContentBox}>
      <UserSuggestion />
      {posts?.length === 0 ? (
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
          {posts?.map((post, index) => {
            return (
              <React.Fragment key={post?._id}>
                <PostBox post={post} />
                {index === posts?.length - 1 && (
                  <div ref={bottomRef} style={{ height: 0 }} />
                )}
              </React.Fragment>
            );
          })}
          {currentPage === totalPages ||
            (newPostLoading && <RotatingLoader w={"50"} sw={"4"} />)}
          {currentPage === totalPages && (
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
