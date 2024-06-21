import { useRef, useState } from "react";
import {
  getRelativeTime,
  handleDoubleTap,
  renderCaptionWithMentionsAndHashtags,
} from "../../../utils/Utils";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { COMMENT_LIKE } from "../../../utils/Constants";
import { likeHeartStyle, userNameStyle } from "../../../styles/GlobalStyles";
import {
  commentHeartStyle,
  commentTextStyle,
  showReplyStyle,
} from "../../../styles/SinglePostStyle";
import { IconHoverStyle } from "../../../styles/PostBoxStyles";
import {
  AiFillHeart,
  AiOutlineHeart,
  BsDot,
  BsThreeDots,
} from "../../../utils/Icons";
import {
  getCommentLikedUsers,
  handleCommentLike,
  updateReplyComment,
} from "../commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { EditComment } from "./EditComment";
import { ReplyList } from "./ReplyList";
import { UserListModal } from "../../../components";

export const CommentItem = ({
  comment,
  ownerId,
  commentEdit,
  setCommentEdit,
  commentDeleteDisclosure,
}) => {
  const lastTapRef = useRef(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [doubleTap, setDoubleTap] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const { commentId, doEdit } = commentEdit;

  const { currentUser } = useSelector((state) => state.authentication);

  const {
    _id,
    owner: { username, avatar: commentAvatar },
    text,
    createdAt,
    likes,
    edit,
    replies,
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
        <Avatar src={commentAvatar?.url} size={"sm"} cursor={"pointer"} />
      </Box>
      {commentId === _id && doEdit ? (
        <EditComment
          commentEdit={commentEdit}
          setCommentEdit={setCommentEdit}
        />
      ) : (
        <Flex flexDir={"column"} w={"100%"} gap={"1rem"}>
          <Flex gap={"1rem"}>
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

              <Flex sx={showReplyStyle}>
                <Text>
                  {edit && (
                    <Flex display={"inline-flex"} alignItems={"center"}>
                      <Text as={"span"}>Edited</Text>
                      <Box display={"inline"} as={BsDot} />
                    </Flex>
                  )}
                  {getRelativeTime(createdAt)}
                </Text>
                {likes?.length !== 0 && (
                  <Text
                    cursor={"pointer"}
                    onClick={() => {
                      dispatch(getCommentLikedUsers({ _id }));
                      onOpen();
                    }}
                  >
                    {likes?.length}
                    {likes?.length > 1 ? " likes" : " like"}
                  </Text>
                )}
                <Text
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(
                      updateReplyComment({
                        commentId: _id,
                        repliedUsername: username,
                        replyAvatar: commentAvatar?.url,
                      })
                    );
                  }}
                >
                  Reply
                </Text>
                {(currentUser._id === ownerId ||
                  currentUser?.username === username) &&
                  commentEdit?.commentId !== _id && (
                    <Box
                      as={BsThreeDots}
                      onClick={() => {
                        setCommentEdit({
                          ...commentEdit,
                          commentId: _id,
                          commentUsername: username,
                          commentText: text,
                        });
                        commentDeleteDisclosure.onOpen();
                      }}
                      fontSize={"1rem"}
                      title={"Comment options"}
                      cursor={"pointer"}
                    />
                  )}
              </Flex>
            </VStack>
            <Box
              as={commentLike ? AiFillHeart : AiOutlineHeart}
              sx={commentLike ? { ...likeHeartStyle } : { ...IconHoverStyle }}
              {...commentHeartStyle}
              onClick={() => {
                setIsLiked(!isLiked);
                commentLike
                  ? dispatch(handleCommentLike({ _id, unlike: true }))
                  : dispatch(handleCommentLike({ _id }));
              }}
              className={isLiked ? "like-animation" : ""}
            />
          </Flex>
          {replies?.length > 0 && (
            <Flex sx={showReplyStyle}>
              <Box borderBottom={"1px solid"} w="1.5rem" />
              <Text onClick={() => setShowReply(!showReply)}>
                {showReply
                  ? "Hide replies"
                  : `View replies (${replies?.length})`}
              </Text>
            </Flex>
          )}
          {showReply &&
            replies?.map((reply) => (
              <ReplyList
                key={reply?._id}
                setCommentEdit={setCommentEdit}
                commentEdit={commentEdit}
                reply={reply}
                _id={_id}
                commentDeleteDisclosure={commentDeleteDisclosure}
              />
            ))}
        </Flex>
      )}
      {isOpen && (
        <UserListModal onClose={onClose} isOpen={isOpen} heading={"Likes"} />
      )}
    </Flex>
  );
};
