import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { PostDeleteModal, UnfollowModal, PostModal } from "../index";
import { simpleButton } from "../../styles/GlobalStyles";
import { updateUploadPost } from "../../pages/Post Feed/postSlice";
import {
  addUserBookmark,
  handleFollowUnfollowUser,
  removeUserBookmark,
} from "../../pages/Post Feed/userSlice";
import { handleShare } from "../../utils/Utils";

export const InfoPopup = ({
  onClose,
  isOpen,
  post,
  fromSinglePost,
  location,
}) => {
  const { colorMode } = useColorMode();
  const unfollowModalDisclosure = useDisclosure();
  const postModalDisclosure = useDisclosure();
  const postDeleteModalDisclosure = useDisclosure();

  const navigate = useNavigate();
  const mainLocation = useLocation();

  const { currentUser } = useSelector((state) => state.authentication);
  const { bookmarks } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const { _id, owner } = post;
  const { _id: userId, username } = owner;

  const isBookmarked = bookmarks?.some((post) => post?._id === _id);
  const isFollowing = currentUser.following.some(
    (user) => user.username === username
  );

  const handleEdit = () => {
    if (currentUser.guest) {
      toast.error("Guest users cannot edit posts.");
      onClose();
    } else {
      dispatch(updateUploadPost({ url: post.url, caption: post.caption }));
      postModalDisclosure.onOpen();
    }
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeUserBookmark({ _id }));
    } else {
      dispatch(addUserBookmark({ _id }));
    }
    onClose();
  };

  const handleFollow = () => {
    dispatch(
      handleFollowUnfollowUser({
        _id: userId,
        follow: true,
        singlePost: _id,
        noPostLoading: true,
        notSelectedUser: true,
      })
    );
    onClose();
  };

  const handleUnfollow = () => {
    unfollowModalDisclosure.onOpen();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://instaverse-um14.netlify.app/post/${_id}`
    );
    toast.success("Link copied to clipboard.");
    onClose();
  };

  const handleGoToPost = () => {
    navigate(`/post/${_id}`, { state: { from: mainLocation } });
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} size={"xs"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent
          bg={colorMode === "dark" ? "black.600" : "white.500"}
          mt={"15rem"}
        >
          <ModalBody>
            {currentUser?.username === username ? (
              <>
                <Button sx={simpleButton} onClick={handleEdit}>
                  Edit
                </Button>
                <Divider />
                <Button
                  sx={simpleButton}
                  color={"red"}
                  onClick={postDeleteModalDisclosure.onOpen}
                >
                  Delete
                </Button>
                <Divider />
              </>
            ) : (
              <>
                <Button sx={simpleButton} onClick={handleBookmark}>
                  {isBookmarked
                    ? "Remove from favourites"
                    : "Add to favourites"}
                </Button>
                <Divider />
                <Button sx={simpleButton} onClick={handleGoToPost}>
                  Go to post
                </Button>
                <Divider />
                <Button sx={simpleButton} onClick={handleCopyLink}>
                  Copy link
                </Button>
                <Divider />
                <Button
                  sx={simpleButton}
                  onClick={() => {
                    handleShare(_id);
                    onClose();
                  }}
                >
                  Share to
                </Button>
                <Divider />
                <Button
                  sx={simpleButton}
                  color={isFollowing ? "red.500" : "blue.500"}
                  onClick={isFollowing ? handleUnfollow : handleFollow}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Divider />
              </>
            )}
            <Button sx={simpleButton} onClick={onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {unfollowModalDisclosure.isOpen && (
        <UnfollowModal
          {...post.owner}
          singlePost={_id}
          isOpen={unfollowModalDisclosure.isOpen}
          onClose={unfollowModalDisclosure.onClose}
          infoPopupOnclose={onClose}
          fromInfoPop={true}
        />
      )}
      {postDeleteModalDisclosure.isOpen && (
        <PostDeleteModal
          _id={_id}
          isOpen={postDeleteModalDisclosure.isOpen}
          onClose={postDeleteModalDisclosure.onClose}
          infoPopupOnclose={onClose}
          fromInfoPop={true}
          fromSinglePost={fromSinglePost}
          location={location}
        />
      )}
      {postModalDisclosure.isOpen && (
        <PostModal
          isOpen={postModalDisclosure.isOpen}
          onClose={postModalDisclosure.onClose}
          edit={true}
          _id={_id}
        />
      )}
    </>
  );
};
