import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getRelativeTime = (postDate) => {
  const timeAgo = dayjs(postDate).fromNow();
  return timeAgo;
};

export const getMutualFollowers = (follower, currentUser) =>
  follower?.filter((followId) =>
    currentUser?.following?.some((user) => user?._id === followId._id)
  );
