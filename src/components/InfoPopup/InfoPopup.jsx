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
import { toast } from "react-hot-toast";

import { useAuth, usePost, useUser } from "../../contexts";
import { UnfollowModal } from "../index";
import { PostModal } from "../index";
import { simpleButton } from "../../styles/GlobalStyles";
import { SET_EDIT_POST } from "../../utils/Constants";

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

  const navigate = useNavigate();
  const mainLocation = useLocation();

  const { currentUser } = useAuth();
  const {
    userState: { userBookmarks },
    handleBookmark,
    handleRemoveBookmark,
    handleFollow,
  } = useUser();
  const { _id, username } = post;
  const { handleDeletePost, postDispatch, handleShare } = usePost();

  const checkBookmark = userBookmarks.find((bookmark) => bookmark === _id);
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
            {currentUser.username === username ? (
              <>
                <Button
                  sx={simpleButton}
                  onClick={() => {
                    postDispatch({ type: SET_EDIT_POST, payload: post });
                    postModalDisclosure.onOpen();
                  }}
                >
                  Edit
                </Button>
                <Divider />
                <Button
                  sx={simpleButton}
                  color={"red"}
                  onClick={() => {
                    handleDeletePost(_id);
                    fromSinglePost ? navigate(location) : "";
                    onClose();
                  }}
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
                      handleRemoveBookmark(_id);
                      onClose();
                    }}
                  >
                    Remove from favourites
                  </Button>
                ) : (
                  <Button
                    sx={simpleButton}
                    onClick={() => {
                      handleBookmark(_id);
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
                      handleFollow(username);
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
          {...post}
          isOpen={unfollowModalDisclosure.isOpen}
          onClose={unfollowModalDisclosure.onClose}
          fromInfoPop={true}
        />
      )}
      {postModalDisclosure.isOpen && (
        <PostModal
          isOpen={postModalDisclosure.isOpen}
          onClose={postModalDisclosure.onClose}
          edit={true}
        />
      )}
    </>
  );
};
