import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  EmojiPopover,
  HeartPopup,
  RotatingLoader,
  UserMentionList,
} from "../../../components";
import { AiOutlineArrowLeft, RxCross2 } from "../../../utils/Icons";
import { PostCommentSection } from "./PostCommentSection";
import { CommentFooter } from "./CommentFooter";
import {
  addCommentToPost,
  addReplyToComment,
  updateReplyComment,
} from "../commentSlice";
import { getSearchedUsers, updateSearchValue } from "../../Post Feed/userSlice";
import {
  debounce,
  handleDoubleTap,
  handleInputChange,
} from "../../../utils/Utils";
import { commentBtnMain, commentInput } from "../../../styles/GlobalStyles";
import {
  addCommentMainBox,
  commentLoaderStyle,
  commentSectionMain,
  mediaPostBox,
  mobileCommentHeading,
  mobileFooterStyle,
  modalContentStyle,
  replyPopup,
  singlePostModalClose,
} from "../../../styles/SinglePostStyle";
import { LIKE } from "../../../utils/Constants";

export const SinglePostModal = ({ onClose, redirectLocation, post }) => {
  const { colorMode } = useColorMode();
  const location = useLocation();

  const navigate = useNavigate();
  const [commentValue, setCommentValue] = useState("");
  const [doubleTap, setDoubleTap] = useState(false);
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const lastTapRef = useRef(0);
  const inputRef = useRef(null);

  const { currentUser } = useSelector((state) => state.authentication);
  const { commentLoader, repliedComment } = useSelector(
    (state) => state.comment
  );
  const dispatch = useDispatch();

  const { commentId, repliedUsername, replyAvatar } = repliedComment;

  const { _id, owner, url, likes } = post;
  const { username } = owner;

  const userLike = likes?.find(
    ({ username }) => username === currentUser.username
  );

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && commentValue.trim() !== "") {
      handleCommentPost();
    }
  };

  const handleCommentPost = () => {
    if (currentUser?.guest) {
      toast.error("Guest users cannot post comment");
      setCommentValue("");
      return;
    }
    if (!commentLoader) {
      if (commentId) {
        dispatch(addReplyToComment({ commentId, text: commentValue })).then(
          () => {
            setCommentValue("");
            dispatch(
              updateReplyComment({
                commentId: "",
                repliedUsername: "",
                replyAvatar: "",
              })
            );
          }
        );
        return;
      }
      dispatch(addCommentToPost({ _id, text: commentValue })).then(() =>
        setCommentValue("")
      );
    }
  };

  useEffect(() => {
    if (commentId) {
      setCommentValue(`@${repliedUsername} `);
      inputRef.current?.focus();
    }
  }, [repliedComment]);

  return (
    <Modal
      onClose={onClose}
      size={{ base: "full", md: "lg", lg: "xl" }}
      isOpen={true}
      maxW="auto"
    >
      <ModalOverlay />
      <ModalContent
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...modalContentStyle}
      >
        <ModalCloseButton
          color={colorMode === "dark" ? "white" : "black"}
          {...singlePostModalClose}
          onClick={() => {
            navigate(redirectLocation || "/");
            dispatch(updateSearchValue(""));
            dispatch(
              updateReplyComment({
                commentId: "",
                repliedUsername: "",
              })
            );
          }}
        />
        <ModalBody p={0} height={"100%"}>
          <HStack align={"flex-start"} height={"600px"}>
            <Flex {...mediaPostBox} pos={"relative"}>
              <Image
                src={url}
                w={"100%"}
                height={"100%"}
                onClick={() =>
                  handleDoubleTap(
                    lastTapRef,
                    userLike,
                    setDoubleTap,
                    dispatch,
                    _id,
                    LIKE,
                    true
                  )
                }
              />
              {doubleTap && <HeartPopup />}
            </Flex>
            <Flex {...commentSectionMain}>
              <HStack {...mobileCommentHeading}>
                <Box
                  as={AiOutlineArrowLeft}
                  fontSize={"1.8rem"}
                  onClick={() => {
                    navigate(
                      location?.pathname === redirectLocation
                        ? `/profile/${username}`
                        : redirectLocation || `/profile/${username}`
                    );
                    dispatch(updateSearchValue(""));
                    dispatch(
                      updateReplyComment({
                        commentId: "",
                        repliedUsername: "",
                        replyAvatar: "",
                      })
                    );
                  }}
                />
                <Text>Comments</Text>
              </HStack>

              {username && (
                <PostCommentSection post={post} location={redirectLocation} />
              )}

              {username && <CommentFooter post={post} userLike={userLike} />}
            </Flex>
          </HStack>
        </ModalBody>
        <ModalFooter
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          {...mobileFooterStyle}
        >
          {commentId && (
            <Flex sx={replyPopup}>
              <Flex gap={"0.5rem"} alignItems={"center"}>
                <Avatar size={"sm"} src={replyAvatar} title={repliedUsername} />
                <Text>Replying to {repliedUsername}</Text>
              </Flex>
              <Text
                as={RxCross2}
                onClick={() => {
                  setCommentValue("");
                  dispatch(
                    updateReplyComment({
                      commentId: "",
                      repliedUsername: "",
                      replyAvatar: "",
                    })
                  );
                  setShowTagBox(false);
                }}
              />
            </Flex>
          )}
          {showTagBox && (
            <UserMentionList
              matchIndex={matchIndex}
              commentValue={commentValue}
              setCommentValue={setCommentValue}
              setShowTagBox={setShowTagBox}
              setMatchIndex={setMatchIndex}
            />
          )}
          <Flex {...addCommentMainBox}>
            <EmojiPopover
              setCommentValue={setCommentValue}
              commentValue={commentValue}
              inputRef={inputRef}
            />
            <Box pos={"relative"} width={"100%"}>
              <Input
                placeholder="Add a comment..."
                value={commentValue}
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
                disabled={commentLoader && commentValue}
                {...commentInput}
                ref={inputRef}
                px={2}
              />
              {commentLoader && commentValue && (
                <Box {...commentLoaderStyle}>
                  <RotatingLoader w={"40"} sw={"3"} />
                </Box>
              )}
            </Box>
            <Button
              {...commentBtnMain}
              onClick={() =>
                commentValue.trim() !== "" ? handleCommentPost() : ""
              }
              color={commentValue.trim() === "" ? "gray" : null}
              disabled={commentLoader || commentValue.trim() === ""}
              _hover={
                commentLoader || commentValue.trim() === ""
                  ? { color: "gray", cursor: "default" }
                  : {}
              }
            >
              Post
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
