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

import { PostDeleteModal, UnfollowModal } from "../index";
import { PostModal } from "../index";
import { simpleButton } from "../../styles/GlobalStyles";
import {
  handleDeletePost,
  updateUploadPost,
} from "../../pages/Post Feed/postSlice";
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
  const {
    _id,
    owner: { _id: userId, username },
    url,
    caption,
  } = post;

  const checkBookmark = bookmarks?.find((post) => post?._id === _id);
  const isFollowing = currentUser.following.find(
    (user) => user.username === username
  );

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
                <Button
                  sx={simpleButton}
                  onClick={() => {
                    dispatch(updateUploadPost({ url, caption }));
                    postModalDisclosure.onOpen();
                  }}
                >
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
                {checkBookmark ? (
                  <Button
                    sx={simpleButton}
                    onClick={() => {
                      dispatch(removeUserBookmark({ _id }));
                      onClose();
                    }}
                  >
                    Remove from favourites
                  </Button>
                ) : (
                  <Button
                    sx={simpleButton}
                    onClick={() => {
                      dispatch(addUserBookmark({ _id }));
                      onClose();
                    }}
                  >
                    Add to favourites
                  </Button>
                )}
                <Divider />
                <Button
                  sx={simpleButton}
                  onClick={() =>
                    navigate(`/post/${_id}`, { state: { from: mainLocation } })
                  }
                >
                  Go to post
                </Button>
                <Divider />
                <Button
                  sx={simpleButton}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://instaverse-um14.netlify.app/post/${_id}`
                    );
                    toast.success("Link copied to your clipboard");
                    onClose();
                  }}
                >
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
                {isFollowing ? (
                  <Button
                    sx={simpleButton}
                    color={"red.500"}
                    onClick={() => {
                      unfollowModalDisclosure.onOpen();
                    }}
                  >
                    Unfollow
                  </Button>
                ) : (
                  <Button
                    sx={simpleButton}
                    color={"blue.500"}
                    onClick={() => {
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
                    }}
                  >
                    Follow
                  </Button>
                )}

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
