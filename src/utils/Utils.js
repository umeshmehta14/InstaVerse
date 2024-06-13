import { Text } from "@chakra-ui/react";
import { getSearchedUsers } from "../pages/Post Feed/userSlice";

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

export const renderCaptionWithHashtags = (caption) => {
  const parts = caption.split(/(#\w+)/g);

  return parts.map((part, index) => {
    if (part.startsWith("#")) {
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

export const debounce = (dispatch) => {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(getSearchedUsers());
    }, 500);
  };
};
