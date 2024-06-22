import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { displayCommentMainBox } from "../../../styles/SinglePostStyle";

import { hideScrollbar, simpleButton } from "../../../styles/GlobalStyles";

import { deleteCommentToPost, deleteReplyFromComment } from "../commentSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CommentItem } from "./CommentItem";
import toast from "react-hot-toast";

export const CommentList = ({ comments, ownerId }) => {
  const { colorMode } = useColorMode();

  const [commentEdit, setCommentEdit] = useState({
    commentId: "",
    commentUsername: "",
    doEdit: false,
    commentText: "",
    replyId: "",
  });

  const { commentId, commentUsername } = commentEdit;

  const commentDeleteDisclosure = useDisclosure();

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.authentication);

  const handleCommentDelete = () => {
    if (currentUser?.guest) {
      toast.error("Guest users cannot delete comment");
      setCommentEdit({
        ...commentEdit,
        commentId: "",
        commentUsername: "",
        commentText: "",
      });
      commentDeleteDisclosure.onClose();
      return;
    }
    commentEdit?.replyId
      ? dispatch(
          deleteReplyFromComment({
            commentId,
            replyId: commentEdit?.replyId,
          })
        )
      : dispatch(deleteCommentToPost({ _id: commentId }));

    setCommentEdit({
      ...commentEdit,
      commentId: "",
      commentUsername: "",
      commentText: "",
    });
    commentDeleteDisclosure.onClose();
  };

  const handleEditComment = () => {
    if (currentUser?.guest) {
      toast.error("Guest users cannot edit comment");
      setCommentEdit({
        ...commentEdit,
        commentId: "",
        commentUsername: "",
        commentText: "",
      });
      commentDeleteDisclosure.onClose();
      return;
    }
    setCommentEdit({
      ...commentEdit,
      doEdit: true,
    });
    commentDeleteDisclosure.onClose();
  };

  return (
    <VStack
      bg={colorMode === "dark" ? "black.900" : "white.500"}
      {...displayCommentMainBox}
      sx={hideScrollbar}
    >
      {comments?.length === 0 ? (
        <Text h="100%" textAlign="center" w="100%" pt="4rem" color="gray">
          No Comments Yet
        </Text>
      ) : (
        comments?.map((comment) => (
          <CommentItem
            key={comment?._id}
            comment={comment}
            ownerId={ownerId}
            commentEdit={commentEdit}
            setCommentEdit={setCommentEdit}
            commentDeleteDisclosure={commentDeleteDisclosure}
          />
        ))
      )}
      {commentDeleteDisclosure.isOpen && (
        <Modal
          onClose={() => {
            setCommentEdit({
              ...commentEdit,
              commentId: "",
              commentUsername: "",
              commentText: "",
            });
            commentDeleteDisclosure.onClose();
          }}
          size={"xs"}
          isOpen={commentDeleteDisclosure.isOpen}
        >
          <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
          <ModalContent
            mt={"20rem"}
            bg={colorMode === "dark" ? "black.700" : "white.500"}
          >
            <ModalBody>
              {currentUser?.username === commentUsername &&
                !commentEdit?.replyId && (
                  <>
                    <Button sx={simpleButton} onClick={handleEditComment}>
                      Edit
                    </Button>

                    <Divider />
                  </>
                )}
              <Button
                sx={simpleButton}
                color={"red.500"}
                onClick={handleCommentDelete}
              >
                Delete
              </Button>
              <Divider />
              <Button
                sx={simpleButton}
                onClick={() => {
                  setCommentEdit({
                    ...commentEdit,
                    commentId: "",
                    commentUsername: "",
                    commentText: "",
                  });
                  commentDeleteDisclosure.onClose();
                }}
              >
                Cancel
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </VStack>
  );
};
