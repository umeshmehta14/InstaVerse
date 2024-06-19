import { Text } from "@chakra-ui/react";
import {
  getSearchedUsers,
  updateSearchedUsers,
  updateSearchValue,
} from "../pages/Post Feed/userSlice";
import {
  handleCommentLike,
  handleReplyCommentLike,
} from "../pages/Single Post/commentSlice";
import { handleLikes } from "../pages/Post Feed/postSlice";
import { useCallback } from "react";

export const getRelativeTime = (date) => {
  const now = new Date();
  const postDate = new Date(date);
  const seconds = Math.floor((now - postDate) / 1000);
  const intervals = {
    year: 31536000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit.charAt(0)}`;
    }
  }
  return "just now";
};

export const getMutualFollowers = (follower, currentUser) =>
  follower?.filter((followId) =>
    currentUser?.following?.some((user) => user?._id === followId._id)
  );

export const handleShare = async (key, value) => {
  try {
    await navigator.share({
      title: "Instaverse",
      text: `Check out this ${value}`,
      url: `https://instaverse-um14.netlify.app/${value}/${key}`,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
};

export const renderCaptionWithMentionsAndHashtags = (caption, navigate) => {
  const parts = caption.split(/(@\w+|#\w+)/g);

  return parts.map((part, index) => {
    if (part.startsWith("@")) {
      const username = part.substring(1);
      return (
        <Text
          as="span"
          key={index}
          color="blue.500"
          cursor="pointer"
          onClick={() => navigate(`/profile/${username}`)}
        >
          {part}
        </Text>
      );
    } else if (part.startsWith("#")) {
      return (
        <Text as="span" key={index} color="blue.500">
          {part}
        </Text>
      );
    }
    return (
      <Text as="span" key={index}>
        {part}
      </Text>
    );
  });
};

export const truncateTextWithHTML = (text) => {
  if (text.length <= 50) return text;

  let truncated = text.substring(0, 50);

  if (text[50] !== " ") {
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex > 0) {
      truncated = truncated.substring(0, lastSpaceIndex);
    }
  }

  return truncated + "...";
};

export const handleDoubleTap = (
  lastTapRef,
  userAction,
  setDoubleTap,
  dispatch,
  _id,
  actionType,
  singlePost
) => {
  const now = Date.now();
  const DOUBLE_TAP_THRESHOLD = 300;

  if (now - lastTapRef.current < DOUBLE_TAP_THRESHOLD) {
    setDoubleTap(true);
    if (!userAction) {
      if (actionType === "like") {
        dispatch(handleLikes({ _id, singlePost }));
      } else if (actionType === "commentLike") {
        dispatch(handleCommentLike({ _id }));
      } else if (actionType === "replyLike") {
        dispatch(
          handleReplyCommentLike({
            commentId: _id,
            replyId: singlePost,
          })
        );
      }
    }
    setTimeout(() => {
      setDoubleTap(false);
    }, 800);
  } else {
    setDoubleTap(false);
  }

  lastTapRef.current = now;
};

export const debounce = (dispatch) => {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(getSearchedUsers());
    }, 500);
  };
};

export const handleInputChange = (
  e,
  setCommentValue,
  setMatchIndex,
  setShowTagBox,
  debouncedFetchData,
  dispatch
) => {
  const value = e.target.value;
  setCommentValue(value);

  const match = value.match(/@(\w*)$/);
  if (match && match[1]) {
    const username = match[1];
    setMatchIndex(match.index);
    setShowTagBox(true);
    dispatch(updateSearchValue(username));
    debouncedFetchData();
  } else {
    setShowTagBox(false);
    setMatchIndex(null);
    dispatch(updateSearchValue(""));
    dispatch(updateSearchedUsers());
  }
};

export const handleUserClick = (
  username,
  matchIndex,
  commentValue,
  setCommentValue,
  setShowTagBox,
  setMatchIndex
) => {
  const newValue = commentValue.slice(0, matchIndex) + `@${username} `;
  setCommentValue(newValue);
  setShowTagBox(false);
  setMatchIndex(null);
};
