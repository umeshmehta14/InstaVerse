import React, { useEffect, useRef } from "react";

import { useLocation, useParams } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

import { MobileSinglePost, SinglePostModal } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { handleGetPostById } from "../Post Feed/postSlice";
import { updateTab } from "../Post Feed/userSlice";
import { SinglePostSkeleton } from "../../components/index";

export const SinglePost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const previousPostIdRef = useRef();

  const redirectLocation = location?.state?.from?.pathname;

  const { onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const {
    singlePost: { post, postLoading },
  } = useSelector((state) => state.post);

  document.title = `@${post?.owner?.username}` || "Instaverse";

  useEffect(() => {
    if (postId && postId !== previousPostIdRef.current) {
      dispatch(handleGetPostById({ _id: postId }));
      dispatch(updateTab(0));
      previousPostIdRef.current = postId;
    }
  }, [postId]);

  console.log({ post });

  return (
    <>
      {isMobile &&
      (redirectLocation?.includes("/explore") ||
        redirectLocation?.includes("/profile")) &&
      post?.url ? (
        <MobileSinglePost />
      ) : postLoading ? (
        <SinglePostSkeleton
          redirectLocation={redirectLocation}
          onClose={onClose}
        />
      ) : (
        post?.owner?.username && (
          <SinglePostModal
            onClose={onClose}
            redirectLocation={redirectLocation}
            post={post}
          />
        )
      )}
    </>
  );
};
