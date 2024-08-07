import React, { useEffect, useRef } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { PostBox, PostBoxSkeleton, UserSuggestion } from "../../components";
import { emptyMessageStyle, heroContentBox } from "../../styles/GlobalStyles";
import { getHomePosts, updateNewPostLoading } from "./postSlice";
import { PostAlert } from "./Post Components/PostAlert";
import { getUserBookmark } from "./userSlice";
import { homeLoaderStyle } from "../../styles/PostFeedStyle";

export const Home = () => {
  const {
    homePosts: { posts, totalPages, currentPage, postFetched },
    newPostLoading,
  } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  document.title = `InstaVerse | Home `;

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
    dispatch(getUserBookmark());
  }, [currentUser]);

  return (
    <Flex sx={heroContentBox}>
      <UserSuggestion />
      {!postFetched && currentPage === 1 && !newPostLoading ? (
        <VStack {...homeLoaderStyle}>
          {new Array(6).fill(null)?.map((_, n) => (
            <PostBoxSkeleton key={n} />
          ))}
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
        <VStack {...homeLoaderStyle}>
          {posts?.map((post, index) => {
            return (
              <React.Fragment key={post?._id}>
                <PostBox post={post} />
                {index === posts?.length - 1 && posts?.length !== 1 && (
                  <div ref={bottomRef} style={{ height: 0 }} />
                )}
              </React.Fragment>
            );
          })}
          {currentPage === totalPages ||
            (newPostLoading && (
              <VStack {...homeLoaderStyle}>
                {new Array(6).fill(null)?.map((_, n) => (
                  <PostBoxSkeleton key={n} />
                ))}
              </VStack>
            ))}
          {currentPage === totalPages && <PostAlert />}
        </VStack>
      )}
    </Flex>
  );
};
