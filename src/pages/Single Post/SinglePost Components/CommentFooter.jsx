import React, { useState } from "react";
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

import { usePost, useUser } from "../../../contexts";
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
import { UserListModal } from "../../../components";
import {
  commentInput,
  emojiPickerButtonNew,
} from "../../../styles/GlobalStyles";
import { commentFooterInputMain } from "../../../styles/SinglePostStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserBookmark,
  getPostLikeUsers,
  removeUserBookmark,
} from "../../Post Feed/userSlice";
import { handleLikes } from "../../Post Feed/postSlice";

export const CommentFooter = ({ post, userLike }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { _id, likes } = post;

  const { handleCreateComment, handleShare } = usePost();
  const { currentUser } = useSelector((state) => state.authentication);
  const { bookmarks } = useSelector((state) => state.user);

  const [isLiked, setIsLiked] = useState(false);

  const [commentValue, setCommentValue] = useState("");

  const bookmarked = bookmarks?.find((post) => post?._id === _id);

  const friendLike = currentUser.following.find(({ username }) =>
    likes.some((likeUser) => likeUser?.username === username)
  );

  const handleLike = () => {
    setIsLiked(true);
    dispatch(handleLikes({ _id, singlePost: true }));
    setTimeout(() => {
      setIsLiked(false);
    }, 1000);
  };

  const handleCommentPost = () => {
    handleCreateComment(commentValue, _id);
    setCommentValue("");
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
                onClick={() => {
                  dispatch(addUserBookmark({ _id }));
                }}
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
        <Popover>
          <PopoverTrigger>
            <Box
              as={BsEmojiSunglasses}
              {...emojiPickerButtonNew}
              title="Emoji"
            />
          </PopoverTrigger>
          <PopoverContent bottom={"27rem"} bg={"transparent"}>
            <PopoverBody p={0}>
              <Picker
                data={data}
                onEmojiSelect={(emoji) =>
                  setCommentValue(commentValue + emoji.native)
                }
                theme={colorMode}
                title="Pick an Emoji"
                emoji=""
              />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Input
          placeholder="Add a comment..."
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          {...commentInput}
          px={"2"}
        />
        <Button
          fontSize={"1rem"}
          variant={"link-button"}
          size="sm"
          onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
          color={commentValue === "" ? "gray" : null}
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
