import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Flex,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

import { REPLY_LIKE } from "../../../utils/Constants";
import {
  getRelativeTime,
  handleDoubleTap,
  renderCaptionWithMentionsAndHashtags,
} from "../../../utils/Utils";
import {
  commentHeartStyle,
  commentTextStyle,
} from "../../../styles/SinglePostStyle";
import { likeHeartStyle, userNameStyle } from "../../../styles/GlobalStyles";
import { AiFillHeart, AiOutlineHeart, BsThreeDots } from "../../../utils/Icons";
import { IconHoverStyle } from "../../../styles/PostBoxStyles";
import {
  getReplyLikedUsers,
  handleReplyCommentLike,
  updateReplyComment,
} from "../commentSlice";
import { UserListModal } from "../../../components";

export const ReplyList = ({
  reply,
  commentDeleteDisclosure,
  setCommentEdit,
  commentEdit,
  _id,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const lastTapRef = useRef(null);
  const [doubleTap, setDoubleTap] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const {
    owner: { username: replyUsername, _id: replyOwnerId, avatar: replyAvatar },
    text: replyText,
    createdAt,
    likes: replyLikes,
    _id: replyId,
  } = reply;
  const isReplyLiked = replyLikes?.find((like) => like === currentUser?._id);

  return (
    <Flex
      key={replyId}
      gap={"1rem"}
      title={replyUsername}
      w={"100%"}
      onClick={(e) => {
        e.stopPropagation();
        handleDoubleTap(
          lastTapRef,
          isReplyLiked,
          setDoubleTap,
          dispatch,
          _id,
          REPLY_LIKE,
          replyId
        );
      }}
    >
      <Flex gap={"1rem"} w={"100%"}>
        <Box pt={"2"} onClick={() => navigate(`/profile/${replyUsername}`)}>
          <Avatar src={replyAvatar?.url} size={"sm"} cursor={"pointer"} />
        </Box>
        <VStack align={"flex-start"} gap={"0"} w={"100%"}>
          <Box>
            <Text
              {...userNameStyle}
              onClick={() => navigate(`/profile/${replyUsername}`)}
              as={"span"}
              mr={"0.3rem"}
            >
              {replyUsername}
            </Text>
            <Text fontWeight={100} {...commentTextStyle} as={"span"}>
              {renderCaptionWithMentionsAndHashtags(replyText, navigate)}
            </Text>
          </Box>

          <Flex
            gap={"0.6rem"}
            alignItems={"center"}
            fontWeight={"600"}
            fontSize="sm"
            color={"#717171e0"}
          >
            <Text>{getRelativeTime(createdAt)}</Text>
            {replyLikes?.length !== 0 && (
              <Text
                cursor={"pointer"}
                onClick={() => {
                  dispatch(getReplyLikedUsers({ _id, replyId }));
                  onOpen();
                }}
              >
                {replyLikes?.length}
                {replyLikes?.length > 1 ? " likes" : " like"}
              </Text>
            )}
            <Text
              cursor={"pointer"}
              onClick={() => {
                if (currentUser?.guest) {
                  toast.error("Guest users cannot reply on comments");
                  return;
                }
                dispatch(
                  updateReplyComment({
                    commentId: _id,
                    repliedUsername: replyUsername,
                    replyAvatar: replyAvatar?.url,
                  })
                );
              }}
            >
              Reply
            </Text>
            {(currentUser._id === replyOwnerId ||
              currentUser?.username === replyUsername) &&
              commentEdit !== _id && (
                <Box
                  as={BsThreeDots}
                  onClick={() => {
                    setCommentEdit({
                      ...commentEdit,
                      commentId: _id,
                      replyId,
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
          as={isReplyLiked ? AiFillHeart : AiOutlineHeart}
          sx={isReplyLiked ? { ...likeHeartStyle } : { ...IconHoverStyle }}
          {...commentHeartStyle}
          onClick={() => {
            setIsLiked(!isLiked);
            isReplyLiked
              ? dispatch(
                  handleReplyCommentLike({
                    commentId: _id,
                    replyId,
                    unlike: true,
                  })
                )
              : dispatch(
                  handleReplyCommentLike({
                    commentId: _id,
                    replyId,
                  })
                );
          }}
          className={isLiked ? "like-animation" : ""}
        />
      </Flex>
      {isOpen && (
        <UserListModal onClose={onClose} isOpen={isOpen} heading={"Likes"} />
      )}
    </Flex>
  );
};
