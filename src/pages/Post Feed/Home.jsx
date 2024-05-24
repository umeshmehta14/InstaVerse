import React, { useEffect, useRef } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";

import { PostBox, RotatingLoader, UserSuggestion } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { emptyMessageStyle, heroContentBox } from "../../styles/GlobalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getHomePosts, updateNewPostLoading } from "./postSlice";
import { PostAlert } from "./Post Components/PostAlert";

export const Home = () => {
  const {
    homePosts: { posts, totalPages, currentPage, postFetched },
    newPostLoading,
  } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  document.title = `InstaVerse | "Home" `;

  const bottomRef = useRef(null);

  const handleObserver = (entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      dispatch(updateNewPostLoading());
      dispatch(getHomePosts({ page: currentPage + 1 }));
    }
  };

  useEffect(() => {
    if (posts?.length > 0 && currentPage !== totalPages) {
      const elementRef = bottomRef?.current;
      const observer = new IntersectionObserver(handleObserver);
      if (elementRef) observer?.observe(elementRef);

      return () => {
        if (elementRef) observer.unobserve(elementRef);
      };
    }
  }, [posts, currentPage, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (posts.length > 0) return;
    dispatch(getHomePosts({ page: 1 }));
  }, [location?.pathname, dispatch]);

  useEffect(() => {
    dispatch(getHomePosts({ page: 1, noLoading: true }));
  }, [currentUser]);

  return (
    <Flex sx={heroContentBox}>
      <UserSuggestion />
      {!postFetched && currentPage === 1 && !newPostLoading ? (
        <VStack
          w={{ base: "100%", lg: "auto" }}
          alignItems={"center"}
          minW={{ md: "468px" }}
          justifyContent={"center"}
          h={{ base: "50vh", md: "90vh" }}
        >
          <RotatingLoader w={"70"} sw={"4"} />
        </VStack>
      ) : posts?.length === 0 ? (
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
          {currentPage === totalPages && <PostAlert />}
        </VStack>
      )}
    </Flex>
  );
};
