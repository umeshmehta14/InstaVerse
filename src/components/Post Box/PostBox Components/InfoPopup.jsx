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
import UnfollowModal from "./UnfollowModal";
import { useAuth, useUser } from "../../../contexts";

const InfoPopup = ({ onClose, isOpen, post, setClicked, clicked }) => {
  const { colorMode } = useColorMode();
  const { currentUser } = useAuth();
  const {
    userState: { userBookmarks },
    handleBookmark,
    handleRemoveBookmark,
  } = useUser();
  const unfollowModalDisclosure = useDisclosure();

  const { _id, username } = post;

  const checkBookmark = userBookmarks.find((bookmark) => bookmark === _id);

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
                <Button sx={simpleButton}>Edit</Button>
                <Divider />
                <Button sx={simpleButton} color={"red"}>
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
                <Button
                  sx={simpleButton}
                  color={"red.500"}
                  onClick={() => {
                    unfollowModalDisclosure.onOpen();
                    onClose();
                  }}
                >
                  Unfollow
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
      <UnfollowModal
        {...post}
        isOpen={unfollowModalDisclosure.isOpen}
        onClose={unfollowModalDisclosure.onClose}
        fromInfoPop={true}
      />
    </>
  );
};

export default InfoPopup;
