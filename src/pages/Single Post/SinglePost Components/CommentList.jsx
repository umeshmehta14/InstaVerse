import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import {
  commentLoaderStyle,
  commentTextStyle,
  displayCommentMainBox,
} from "../../../styles/SinglePostStyle";
import { IconHoverStyle } from "../../../styles/PostBoxStyles";
import {
  AiFillHeart,
  AiOutlineHeart,
  BsDot,
  BsThreeDots,
} from "../../../utils/Icons";
import {
  hideScrollbar,
  likeHeartStyle,
  simpleButton,
  userNameStyle,
} from "../../../styles/GlobalStyles";

import {
  deleteCommentToPost,
  editCommentToPost,
  handleCommentLike,
} from "../commentSlice";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  EmojiPopover,
  RotatingLoader,
  UserMentionList,
} from "../../../components";
import {
  debounce,
  getRelativeTime,
  handleDoubleTap,
  handleInputChange,
  renderCaptionWithMentionsAndHashtags,
} from "../../../utils/Utils";
import { getSearchedUsers } from "../../Post Feed/userSlice";
import { COMMENT_LIKE } from "../../../utils/Constants";

export const CommentList = ({ comments, ownerId }) => {
  const { colorMode } = useColorMode();

  const [isLiked, setIsLiked] = useState(false);
  const [doubleTap, setDoubleTap] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [commentEdit, setCommentEdit] = useState({
    commentId: "",
    commentUsername: "",
    doEdit: false,
  });
  const inputRef = useRef(null);

  const { commentId, doEdit, commentUsername } = commentEdit;
  const lastTapRef = useRef(0);
  const navigate = useNavigate();
  const commentDeleteDisclosure = useDisclosure();

  const dispatch = useDispatch();

  const { commentLoader } = useSelector((state) => state.comment);
  const { currentUser } = useSelector((state) => state.authentication);

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && commentValue !== "") {
      handleEditComment();
    }
  };

  const handleEditComment = () => {
    if (!commentLoader) {
      dispatch(
        editCommentToPost({
          _id: commentId,
          text: commentValue,
        })
      ).then(() => {
        setCommentValue("");
        setCommentEdit({
          commentId: "",
          doEdit: false,
          commentUsername: "",
        });
      });
    }
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
        comments?.map((comment) => {
          const {
            _id,
            owner: { username, avatar: commentAvatar },
            text,
            createdAt,
            likes,
            edit,
          } = comment || {};
          const commentLike = likes?.find((like) => like === currentUser?._id);

          return (
            <Flex
              key={_id}
              gap={"1rem"}
              title={username}
              w={"100%"}
              onClick={() =>
                handleDoubleTap(
                  lastTapRef,
                  commentLike,
                  setDoubleTap,
                  dispatch,
                  _id,
                  COMMENT_LIKE
                )
              }
            >
              <Box pt={"2"} onClick={() => navigate(`/profile/${username}`)}>
                <Avatar
                  src={commentAvatar?.url}
                  size={"sm"}
                  cursor={"pointer"}
                />
              </Box>
              {commentId === _id && doEdit ? (
                <Flex
                  flexDir={"column"}
                  w={"100%"}
                  pos={"relative"}
                  gap={"0.5rem"}
                >
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
                      value={commentValue}
                      border={"none"}
                      borderBottom={"1px solid"}
                      borderRadius={0}
                      _focusVisible={{ outline: "none" }}
                      _hover={{ borderColor: "white" }}
                      px={"1"}
                      h={"30px"}
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
                        onClick={() => {
                          setCommentEdit({ commentId: "", doEdit: false });
                          setCommentValue("");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={commentLoader || commentValue === ""}
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
              ) : (
                <>
                  <VStack align={"flex-start"} gap={"0"} w={"100%"}>
                    <Box>
                      <Text
                        {...userNameStyle}
                        onClick={() => navigate(`/profile/${username}`)}
                        as={"span"}
                        mr={"0.3rem"}
                      >
                        {username}
                      </Text>
                      <Text fontWeight={100} {...commentTextStyle} as={"span"}>
                        {renderCaptionWithMentionsAndHashtags(text, navigate)}
                      </Text>
                    </Box>

                    <Flex gap={"0.6rem"} alignItems={"center"}>
                      <Text fontSize="sm" color={"#717171e0"}>
                        {edit && (
                          <Flex display={"inline-flex"} alignItems={"center"}>
                            <Text as={"span"}>Edited</Text>
                            <Box display={"inline"} as={BsDot} />
                          </Flex>
                        )}
                        {getRelativeTime(createdAt)}
                      </Text>
                      {likes?.length !== 0 && (
                        <Text fontSize="sm" color={"#717171e0"}>
                          {likes?.length}
                          {likes?.length > 1 ? " likes" : " like"}
                        </Text>
                      )}
                      {(currentUser._id === ownerId ||
                        currentUser?.username === username) &&
                        commentEdit !== _id && (
                          <Box
                            as={BsThreeDots}
                            onClick={() => {
                              setCommentEdit({
                                ...commentEdit,
                                commentId: _id,
                                commentUsername: username,
                              });
                              setCommentValue(text);
                              commentDeleteDisclosure.onOpen();
                            }}
                          />
                        )}
                    </Flex>
                  </VStack>
                  <Box
                    as={commentLike ? AiFillHeart : AiOutlineHeart}
                    fontSize={"12px"}
                    sx={
                      commentLike
                        ? { ...likeHeartStyle }
                        : { ...IconHoverStyle }
                    }
                    w={"10%"}
                    mt={"2"}
                    justifySelf={"flex-end"}
                    onClick={() => {
                      setIsLiked(!isLiked);
                      commentLike
                        ? dispatch(handleCommentLike({ _id, unlike: true }))
                        : dispatch(handleCommentLike({ _id }));
                    }}
                    className={isLiked ? "like-animation" : ""}
                  />
                </>
              )}
            </Flex>
          );
        })
      )}
      {commentDeleteDisclosure.isOpen && (
        <Modal
          onClose={commentDeleteDisclosure.onClose}
          size={"xs"}
          isOpen={commentDeleteDisclosure.isOpen}
        >
          <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
          <ModalContent
            mt={"20rem"}
            bg={colorMode === "dark" ? "black.700" : "white.500"}
          >
            <ModalBody>
              {currentUser?.username === commentUsername && (
                <>
                  <Button
                    sx={simpleButton}
                    onClick={() => {
                      setCommentEdit({
                        ...commentEdit,
                        doEdit: true,
                      });
                      commentDeleteDisclosure.onClose();
                    }}
                  >
                    Edit
                  </Button>

                  <Divider />
                </>
              )}
              <Button
                sx={simpleButton}
                color={"red.500"}
                onClick={() => {
                  dispatch(deleteCommentToPost({ _id: commentId }));
                  commentDeleteDisclosure.onClose();
                }}
              >
                Delete
              </Button>
              <Divider />
              <Button
                sx={simpleButton}
                onClick={commentDeleteDisclosure.onClose}
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
