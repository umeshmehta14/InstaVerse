import React from "react";
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

import { simpleButton } from "../../../styles/PostBoxStyles";
import { UnfollowModal } from "../../index";
import { useAuth, usePost, useUser } from "../../../contexts";
import { PostModal } from "../../Post Modal/PostModal";
import { SET_EDIT_POST } from "../../../utils/Constants";

const InfoPopup = ({ onClose, isOpen, post, setClicked, clicked }) => {
  const { colorMode } = useColorMode();
  const { currentUser } = useAuth();
  const {
    userState: { userBookmarks },
    handleBookmark,
    handleRemoveBookmark,
    handleFollow,
  } = useUser();
  const unfollowModalDisclosure = useDisclosure();
  const postModalDisclosure = useDisclosure();

  const { _id, username } = post;
  const { handleDeletePost, postDispatch } = usePost();

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
                  onClick={() => handleDeletePost(_id)}
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
                      setClicked(!clicked);
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
                  onClick={() => console.log("link copy")}
                >
                  Copy link
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
      <UnfollowModal
        {...post}
        isOpen={unfollowModalDisclosure.isOpen}
        onClose={unfollowModalDisclosure.onClose}
        fromInfoPop={true}
      />
      <PostModal
        isOpen={postModalDisclosure.isOpen}
        onClose={postModalDisclosure.onClose}
        edit={true}
      />
    </>
  );
};

export default InfoPopup;
