import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Input, useColorMode } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { debounce, handleInputChange } from "../../../utils/Utils";
import {
  EmojiPopover,
  RotatingLoader,
  UserMentionList,
} from "../../../components";
import { getSearchedUsers } from "../../Post Feed/userSlice";
import { editCommentToPost } from "../commentSlice";
import {
  commentLoaderStyle,
  editInputStyle,
} from "../../../styles/SinglePostStyle";

export const EditComment = ({ setCommentEdit, commentEdit }) => {
  const { colorMode } = useColorMode();

  const { commentLoader } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [commentValue, setCommentValue] = useState(commentEdit?.commentText);

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleEditComment = useCallback(() => {
    if (!commentLoader && commentValue.trim()) {
      dispatch(
        editCommentToPost({
          _id: commentEdit?.commentId,
          text: commentValue,
        })
      ).then(() => {
        setCommentValue("");
        setCommentEdit({
          commentId: "",
          doEdit: false,
          commentUsername: "",
          commentText: "",
        });
      });
    }
  }, [commentLoader, commentValue, commentEdit, dispatch, setCommentEdit]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && commentValue.trim()) {
        handleEditComment();
      }
    },
    [commentValue, handleEditComment]
  );

  const handleCancel = useCallback(() => {
    setCommentEdit({ commentId: "", doEdit: false, commentText: "" });
    setCommentValue("");
  }, [setCommentEdit]);

  useEffect(() => {
    if (commentEdit?.doEdit) {
      inputRef.current.focus();
    }
  }, [commentEdit]);

  return (
    <Flex flexDir={"column"} w={"100%"} pos={"relative"} gap={"0.5rem"}>
      <Box pos={"relative"}>
        {showTagBox && (
          <UserMentionList
            matchIndex={matchIndex}
            commentValue={commentValue}
            setCommentValue={setCommentValue}
            setShowTagBox={setShowTagBox}
            setMatchIndex={setMatchIndex}
            bottom={true}
          />
        )}
        <Input
          sx={editInputStyle}
          value={commentValue}
          disabled={commentLoader}
          ref={inputRef}
          onChange={(e) =>
            handleInputChange(
              e,
              setCommentValue,
              setMatchIndex,
              setShowTagBox,
              debouncedFetchData,
              dispatch
            )
          }
          onKeyDown={handleKeyPress}
        />
        {commentLoader && (
          <Box {...commentLoaderStyle}>
            <RotatingLoader w={"40"} sw={"3"} />
          </Box>
        )}
      </Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <EmojiPopover
          setCommentValue={setCommentValue}
          commentValue={commentValue}
          inputRef={inputRef}
          bottom={true}
        />
        <Flex>
          <Button
            variant={"link-button"}
            color={colorMode === "dark" ? "white" : "black"}
            fontSize={"1rem"}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={commentLoader || commentValue.trim() === ""}
            _disabled={{ color: "gray.400", cursor: "default" }}
            variant={"link-button"}
            fontSize={"1rem"}
            onClick={handleEditComment}
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
