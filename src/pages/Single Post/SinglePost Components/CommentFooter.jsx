import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
  AiFillHeart,
  AiOutlineHeart,
  BsEmojiSunglasses,
  FaBookmark,
  FaRegBookmark,
  IoPaperPlaneOutline,
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
import {
  commentInput,
  emojiPickerButtonNew,
  userNameStyle,
} from "../../../styles/GlobalStyles";
import {
  commentFooterInputMain,
  commentLoaderStyle,
} from "../../../styles/SinglePostStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserBookmark,
  getPostLikeUsers,
  getSearchedUsers,
  removeUserBookmark,
  updateSearchedUsers,
  updateSearchValue,
} from "../../Post Feed/userSlice";
import { handleLikes } from "../../Post Feed/postSlice";
import { debounce, handleShare } from "../../../utils/Utils";
import { addCommentToPost } from "../commentSlice";

export const CommentFooter = ({ post, userLike }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id, likes } = post;

  const { currentUser } = useSelector((state) => state.authentication);
  const { bookmarks } = useSelector((state) => state.user);
  const { commentLoader } = useSelector((state) => state.comment);

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

  const handleCommentPost = () => {
    if (!commentLoader) {
      dispatch(addCommentToPost({ _id, text: commentValue })).then(() =>
        setCommentValue("")
      );
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCommentValue(value);

    const match = value.match(/@(\w*)$/);
    if (match && match[1]) {
      const username = match[1];
      setMatchIndex(match.index);
      setShowTagBox(true);
      dispatch(updateSearchValue(username));
      debouncedFetchData(username);
    } else {
      setShowTagBox(false);
      setMatchIndex(null);
      dispatch(updateSearchValue(""));
      dispatch(updateSearchedUsers());
    }
  };

  const handleUserClick = (username) => {
    const newValue = commentValue.slice(0, matchIndex) + `@${username} `;
    setCommentValue(newValue);
    setShowTagBox(false);
    setMatchIndex(null);
  };

  return (
    <>
      <Divider display={{ base: "none", md: "flex" }} />
      <Flex {...iconPostStyles} display={{ base: "none", md: "flex" }}>
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
              onClick={() => handleShare(_id)}
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
        {showTagBox && <UserMentionList handleUserClick={handleUserClick} />}
        <EmojiPopover
          setCommentValue={setCommentValue}
          commentValue={commentValue}
          inputRef={inputRef}
        />
        <Box pos={"relative"} width={"100%"}>
          <Input
            placeholder="Add a comment..."
            value={commentValue}
            onChange={handleInputChange}
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
          onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
          color={commentValue === "" ? "gray" : null}
          disabled={commentLoader || commentValue === ""}
          _disabled={{ color: "gray.400", cursor: "default" }}
          _hover={
            commentLoader || commentValue === ""
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
    </>
  );
};
