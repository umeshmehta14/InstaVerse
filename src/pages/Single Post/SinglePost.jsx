import React, { useEffect } from "react";

import { useLocation, useParams } from "react-router-dom";
import { useDisclosure, useMediaQuery } from "@chakra-ui/react";

import { MobileSinglePost, SinglePostModal } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { handleGetPostById } from "../Post Feed/postSlice";
import { updateTab } from "../Post Feed/userSlice";
import { SinglePostSkeleton } from "../../components";

export const SinglePost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirectLocation = location?.state?.from?.pathname;

  const { onClose } = useDisclosure();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const {
    singlePost: { post, postLoading },
  } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.authentication);

  const { owner } = post || {};
  const { username } = owner || {};

  document.title = `@${username}` || "Instaverse";

  console.log({ postLoading });

  useEffect(() => {
    if (postId) {
      dispatch(handleGetPostById({ _id: postId }));
      dispatch(updateTab(0));
    }
  }, [postId, dispatch, currentUser]);

  return (
    <>
      {isMobile &&
      (redirectLocation?.includes("/explore") ||
        redirectLocation?.includes("/profile")) ? (
        <MobileSinglePost />
      ) : postLoading ? (
        <SinglePostSkeleton
          redirectLocation={redirectLocation}
          onClose={onClose}
        />
      ) : (
        <SinglePostModal
          onClose={onClose}
          redirectLocation={redirectLocation}
        />
      )}
    </>
  );
};
