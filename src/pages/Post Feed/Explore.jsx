import { Box } from "@chakra-ui/react";
import { ExploreSkeleton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { GridBox } from "../Profile/Profile Components/GridBox";
import { useEffect, useRef, useCallback } from "react";
import { getExplorePosts, updateNewPostLoading } from "./postSlice";
import _ from "lodash";
import { PostAlert } from "./Post Components/PostAlert";
import { exploreContainer } from "../../styles/PostFeedStyle";

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
    <Box {...exploreContainer}>
      {!postFetched && currentPage === 1 && !newPostLoading ? (
        <ExploreSkeleton />
      ) : (
        <GridBox showingPost={posts} />
      )}
      <div ref={bottomRef} style={{ height: 20 }} />
      {newPostLoading && <ExploreSkeleton />}
      {currentPage === totalPages && <PostAlert />}
    </Box>
  );
};
