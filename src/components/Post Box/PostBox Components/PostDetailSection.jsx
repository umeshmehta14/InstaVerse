import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import {
  commentInput,
  likeHeartStyle,
  userNameStyle,
  commentBtnMain,
} from "../../../styles/GlobalStyles";
import {
  IconHoverStyle,
  friendLikeUserStyle,
  iconPostStyles,
  postIconStyle,
  userBoldStyle,
  captionToggleBtn,
  postBoxFooterMain,
} from "../../../styles/PostBoxStyles";
import {
  AiOutlineHeart,
  AiFillHeart,
  FaRegComment,
  IoPaperPlaneOutline,
  FaBookmark,
  FaRegBookmark,
} from "../../../utils/Icons";
import { handleLikes } from "../../../pages/Post Feed/postSlice";
import {
  addUserBookmark,
  getPostLikeUsers,
  getSearchedUsers,
  removeUserBookmark,
} from "../../../pages/Post Feed/userSlice";
import {
  debounce,
  handleInputChange,
  handleShare,
  renderCaptionWithMentionsAndHashtags,
  truncateTextWithHTML,
} from "../../../utils/Utils";
import { commentLoaderStyle } from "../../../styles/SinglePostStyle";
import { RotatingLoader } from "../../Loader/RotatingLoader";
import { addCommentToPost } from "../../../pages/Single Post/commentSlice";
import { UserMentionList } from "../../UserMention List/UserMentionList";
import { EmojiPopover } from "../../EmojiPopover/EmojiPopover";

const PostDetailSection = ({
  onOpen,
  post,
  bookmarked,
  setClicked,
  clicked,
  userLike,
  singlePost,
}) => {
  const { colorMode } = useColorMode();

  const navigate = useNavigate();
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [showTagBox, setShowTagBox] = useState(false);
  const [matchIndex, setMatchIndex] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const inputRef = useRef(null);

  const { currentUser } = useSelector((state) => state.authentication);
  const { commentLoader } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const {
    _id,
    owner: { username },
    comments,
    totalComments: tComments,
    caption,
    likes,
  } = post;

  const totalComments = comments?.length || tComments;

  const friendLike = currentUser.following.find(({ username }) =>
    likes.some((likeUser) => likeUser?.username === username)
  );

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && commentValue !== "") {
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
      dispatch(addCommentToPost({ _id, text: commentValue })).then(() =>
        setCommentValue("")
      );
    }
  };

  const debouncedFetchData = useCallback(debounce(dispatch), [
    getSearchedUsers,
  ]);

  const handleLike = () => {
    setIsLiked(true);
    dispatch(handleLikes({ _id, singlePost }));
    setTimeout(() => {
      setIsLiked(false);
    }, 1000);
  };

  return (
    <>
      <Flex {...iconPostStyles}>
        <Flex
          fontSize={"1.7rem"}
          color={colorMode === "light" ? "black" : "white"}
          justifyContent={"space-between"}
        >
          <HStack justifyContent={"space-between"} w={"30%"}>
            {userLike ? (
              <Box
                as={AiFillHeart}
                {...likeHeartStyle}
                title="Unlike"
                onClick={() => {
                  dispatch(handleLikes({ _id, unlike: true, singlePost }));
                }}
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
              as={FaRegComment}
              sx={postIconStyle}
              title="Comment"
              onClick={() =>
                navigate(`/post/${_id}`, { state: { from: location } })
              }
            />
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
                onClick={() => {
                  dispatch(addUserBookmark({ _id }));
                  setClicked(!clicked);
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
              onClick={() => navigate(`/profile/${friendLike.username}`)}
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

        {caption?.length !== 0 && (
          <Box
            fontSize={"sm"}
            w={"100%"}
            overflow={isExpanded ? "visible" : "hidden"}
            whiteSpace="break-spaces"
          >
            <Text
              as="span"
              {...userNameStyle}
              onClick={() => navigate(`/profile/${username}`)}
              mr={"0.3rem"}
            >
              {username}
            </Text>
            <Text
              as="span"
              fontWeight={100}
              fontSize={"0.95rem"}
              display="inline"
              whiteSpace={isExpanded ? "break-spaces" : "normal"}
            >
              {isExpanded
                ? renderCaptionWithMentionsAndHashtags(caption, navigate)
                : renderCaptionWithMentionsAndHashtags(
                    truncateTextWithHTML(caption),
                    navigate
                  )}
            </Text>
            {caption?.length > 50 && (
              <Button {...captionToggleBtn} onClick={toggleExpanded}>
                {isExpanded ? "Show less" : "more"}
              </Button>
            )}
          </Box>
        )}

        <Text
          fontSize={"sm"}
          color={"#717171e0"}
          cursor={"pointer"}
          onClick={() =>
            navigate(`/post/${_id}`, { state: { from: location } })
          }
        >
          {totalComments > 0 &&
            `View ${totalComments > 1 ? "all" : ""} ${totalComments}  comment${
              totalComments > 1 ? "s" : ""
            }`}
        </Text>
      </Flex>

      <Flex {...postBoxFooterMain}>
        {showTagBox && (
          <UserMentionList
            matchIndex={matchIndex}
            commentValue={commentValue}
            setCommentValue={setCommentValue}
            setShowTagBox={setShowTagBox}
            setMatchIndex={setMatchIndex}
          />
        )}

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
            disabled={commentLoader}
            {...commentInput}
            ref={inputRef}
            px={0}
          />
          {commentLoader && commentValue && (
            <Box {...commentLoaderStyle}>
              <RotatingLoader w={"40"} sw={"3"} />
            </Box>
          )}
        </Box>
        <Button
          {...commentBtnMain}
          onClick={() => (commentValue !== "" ? handleCommentPost() : "")}
          color={commentValue === "" ? "gray" : null}
          disabled={commentLoader || commentValue === ""}
          _hover={
            commentLoader || commentValue === ""
              ? { color: "gray", cursor: "default" }
              : {}
          }
          visibility={commentValue.length === 0 ? "hidden" : "visible"}
        >
          Post
        </Button>
        <EmojiPopover
          setCommentValue={setCommentValue}
          commentValue={commentValue}
          inputRef={inputRef}
        />
      </Flex>
    </>
  );
};

export default PostDetailSection;
