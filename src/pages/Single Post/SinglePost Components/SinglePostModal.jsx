import { useDispatch, useSelector } from "react-redux";
import { useCallback, useRef, useState } from "react";
import {
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

import { commentInput } from "../../../styles/GlobalStyles";
import {
  EmojiPopover,
  HeartPopup,
  RotatingLoader,
  UserMentionList,
} from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addCommentMainBox,
  commentLoaderStyle,
  commentSectionMain,
  mediaPostBox,
  mobileCommentHeading,
  mobileFooterStyle,
  modalContentStyle,
  singlePostModalClose,
} from "../../../styles/SinglePostStyle";
import { AiOutlineArrowLeft } from "../../../utils/Icons";
import { DisplayComments } from "./DisplayComments";
import { CommentFooter } from "./CommentFooter";
import { handleLikes } from "../../Post Feed/postSlice";
import { addCommentToPost } from "../commentSlice";
import {
  getSearchedUsers,
  updateSearchedUsers,
  updateSearchValue,
} from "../../Post Feed/userSlice";
import { debounce } from "../../../utils/Utils";

export const SinglePostModal = ({ onClose, redirectLocation, post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const [commentValue, setCommentValue] = useState("");
  const [doubleTap, setDoubleTap] = useState(false);
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const lastTapRef = useRef(0);
  const inputRef = useRef(null);

  const { currentUser } = useSelector((state) => state.authentication);
  const { commentLoader } = useSelector((state) => state.comment);

  const { _id, owner, url, likes } = post;
  const { username } = owner;

  const userLike = likes?.find(
    ({ username }) => username === currentUser.username
  );

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && commentValue !== "") {
      handleCommentPost();
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_THRESHOLD = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
      setDoubleTap(true);
      if (!userLike) {
        dispatch(handleLikes({ _id, singlePost: true }));
      }
      setTimeout(() => {
        setDoubleTap(false);
      }, 800);
    } else {
      setDoubleTap(false);
    }

    lastTapRef.current = now;
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
          }}
        />
        <ModalBody p={0} height={"100%"}>
          <HStack align={"flex-start"} height={"600px"}>
            <Flex {...mediaPostBox} pos={"relative"}>
              <Image
                src={url}
                w={"100%"}
                height={"100%"}
                onClick={() => handleDoubleTap()}
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
                  }}
                />
                <Text>Comments</Text>
              </HStack>

              {username && (
                <DisplayComments post={post} location={redirectLocation} />
              )}

              {username && <CommentFooter post={post} userLike={userLike} />}
            </Flex>
          </HStack>
        </ModalBody>
        <ModalFooter
          bg={colorMode === "dark" ? "black.900" : "white.500"}
          {...mobileFooterStyle}
        >
          {showTagBox && <UserMentionList handleUserClick={handleUserClick} />}
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
                onChange={handleInputChange}
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
