import { Box, Flex } from "@chakra-ui/react";
import { RotatingLoader } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { GridBox } from "../Profile/Profile Components/GridBox";
import { useEffect, useRef, useCallback } from "react";
import { getExplorePosts, updateNewPostLoading } from "./postSlice";
import _ from "lodash";
import { PostAlert } from "./Post Components/PostAlert";

export const Explore = () => {
  const {
    explorePosts: { posts, totalPages, currentPage, postFetched },
    newPostLoading,
  } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  document.title = `InstaVerse | Explore`;

  const bottomRef = useRef(null);

  const handleObserver = useCallback(
    _.throttle((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && currentPage < totalPages && !newPostLoading) {
        dispatch(updateNewPostLoading());
        dispatch(getExplorePosts({ page: currentPage + 1 }));
      }
    }, 1000),
    [dispatch, currentPage, totalPages, newPostLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    const elementRef = bottomRef.current;
    if (elementRef) {
      observer.observe(elementRef);
    }

    return () => {
      if (elementRef) {
        observer.unobserve(elementRef);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (currentPage === 1) {
      dispatch(getExplorePosts({ page: 1 }));
    }
  }, [dispatch]);

  return (
    <Box
      minH={"100vh"}
      w={"100%"}
      p={{ base: 0, md: "1rem" }}
      maxW={"975px"}
      margin={"0 auto"}
      mb={{ base: "4.2rem", md: "0.4rem" }}
    >
      {!postFetched && currentPage === 1 && !newPostLoading ? (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          minH={"30vh"}
          width={"100%"}
        >
          <RotatingLoader w={"50"} sw={"3"} />
        </Flex>
      ) : (
        <GridBox showingPost={posts} />
      )}
      <div ref={bottomRef} style={{ height: 20 }} />
      {newPostLoading && (
        <Flex
          width={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"4rem"}
        >
          <RotatingLoader w={"50"} sw={"4"} />
        </Flex>
      )}
      {currentPage === totalPages && <PostAlert />}
    </Box>
  );
};
