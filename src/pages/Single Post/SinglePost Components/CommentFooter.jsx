import { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";

import {
  AiFillHeart,
  AiOutlineHeart,
  FaBookmark,
  FaRegBookmark,
  IoPaperPlaneOutline,
  RxCross2,
} from "../../../utils/Icons";
import {
  IconHoverStyle,
  friendLikeUserStyle,
  iconPostStyles,
  postIconStyle,
  userBoldStyle,
} from "../../../styles/PostBoxStyles";
import {
  EmojiPopover,
  RotatingLoader,
  UserListModal,
  UserMentionList,
} from "../../../components";
import { commentInput, userNameStyle } from "../../../styles/GlobalStyles";
import {
  commentFooterInputMain,
  commentLoaderStyle,
  replyPopup,
} from "../../../styles/SinglePostStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserBookmark,
  getPostLikeUsers,
  getSearchedUsers,
  removeUserBookmark,
} from "../../Post Feed/userSlice";
import { handleLikes } from "../../Post Feed/postSlice";
import { debounce, handleInputChange, handleShare } from "../../../utils/Utils";
import {
  addReplyToComment,
  addCommentToPost,
  updateReplyComment,
} from "../commentSlice";
import toast from "react-hot-toast";

export const CommentFooter = ({ post, userLike }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id, likes } = post;

  const { currentUser } = useSelector((state) => state.authentication);
  const { bookmarks } = useSelector((state) => state.user);
  const { commentLoader, repliedComment } = useSelector(
    (state) => state.comment
  );

  const { commentId, repliedUsername, replyAvatar } = repliedComment;

  const [isLiked, setIsLiked] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const inputRef = useRef(null);

  const bookmarked = bookmarks?.find((post) => post?._id === _id);

  const friendLike = currentUser.following.find(({ username }) =>
    likes.some((likeUser) => likeUser?.username === username)
  );

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleLike = () => {
    setIsLiked(true);
    dispatch(handleLikes({ _id, singlePost: true }));
    setTimeout(() => {
      setIsLiked(false);
    }, 1000);
  };

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
    <Box pos={"relative"}>
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
            }}
          />
        </Flex>
      )}
      <Divider display={{ base: "none", md: "flex" }} />
      <Flex
        {...iconPostStyles}
        pb={"6px !important"}
        display={{ base: "none", md: "flex" }}
      >
        <Flex
          fontSize={"1.7rem"}
          color={colorMode === "light" ? "black" : "white"}
          justifyContent={"space-between"}
        >
          <HStack justifyContent={"space-between"} w={"20%"}>
            {userLike ? (
              <Box
                as={AiFillHeart}
                cursor="pointer"
                color={"red"}
                title="Unlike"
                onClick={() =>
                  dispatch(handleLikes({ _id, unlike: true, singlePost: true }))
                }
              />
            ) : (
              <Box
                as={AiOutlineHeart}
                {...IconHoverStyle}
                title="Like"
                onClick={() => handleLike()}
                className={isLiked ? "like-animation" : ""}
              />
            )}
            <Box
              as={IoPaperPlaneOutline}
              sx={IconHoverStyle}
              onClick={() => handleShare(_id, "post")}
              title="Share"
            />
          </HStack>
          <HStack>
            {bookmarked ? (
              <Box
                as={FaBookmark}
                sx={postIconStyle}
                title="Remove"
                onClick={() => dispatch(removeUserBookmark({ _id }))}
              />
            ) : (
              <Box
                as={FaRegBookmark}
                sx={postIconStyle}
                title="Save"
                onClick={() => dispatch(addUserBookmark({ _id }))}
              />
            )}
          </HStack>
        </Flex>
        {friendLike ? (
          <Flex fontSize={"sm"} align={"center"}>
            <Text>Liked by </Text>
            <Flex
              sx={friendLikeUserStyle}
              onClick={() => navigate(`/profile/${friendLike?.username}`)}
              align={"center"}
              {...userNameStyle}
            >
              <Avatar
                size="2xs"
                title={friendLike?.username}
                src={friendLike?.avatar?.url}
              />
              {friendLike?.username}
            </Flex>
            {likes?.length !== 1 && (
              <>
                <Text mx={"1"}>and</Text>
                <Text
                  sx={userBoldStyle}
                  onClick={() => {
                    dispatch(getPostLikeUsers({ _id }));
                    onOpen();
                  }}
                >
                  {likes?.length - 1} others
                </Text>
              </>
            )}
          </Flex>
        ) : (
          likes?.length !== 0 && (
            <Text
              onClick={() => {
                dispatch(getPostLikeUsers({ _id }));
                onOpen();
              }}
              cursor={"pointer"}
            >
              {likes?.length} likes
            </Text>
          )
        )}
      </Flex>
      <Flex
        bg={colorMode === "dark" ? "black.900" : "white.500"}
        {...commentFooterInputMain}
      >
        {showTagBox && (
          <UserMentionList
            matchIndex={matchIndex}
            commentValue={commentValue}
            setCommentValue={setCommentValue}
            setShowTagBox={setShowTagBox}
            setMatchIndex={setMatchIndex}
          />
        )}
        <EmojiPopover
          setCommentValue={setCommentValue}
          commentValue={commentValue}
          inputRef={inputRef}
          singlePost={true}
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
          />
          {commentLoader && commentValue && (
            <Box {...commentLoaderStyle}>
              <RotatingLoader w={"40"} sw={"3"} />
            </Box>
          )}
        </Box>
        <Button
          fontSize={"1rem"}
          variant={"link-button"}
          size="sm"
          onClick={() =>
            commentValue.trim() !== "" ? handleCommentPost() : ""
          }
          color={commentValue.trim() === "" ? "gray" : null}
          disabled={commentLoader || commentValue.trim() === ""}
          _disabled={{ color: "gray.400", cursor: "default" }}
          _hover={
            commentLoader || commentValue.trim() === ""
              ? { color: "gray", cursor: "default" }
              : {}
          }
        >
          Post
        </Button>
      </Flex>
      {isOpen && (
        <UserListModal onClose={onClose} isOpen={isOpen} heading={"Liked By"} />
      )}
    </Box>
  );
};
