import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getRelativeTime = (postDate) => {
  const timeAgo = dayjs(postDate).fromNow();
  return timeAgo;
};

export const postFilter = (posts, filter) =>
  filter === "latest"
    ? [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [...posts.filter(({ likes }) => likes.likeCount > 0)].sort(
        (a, b) => b.likes.likeCount - a.likes.likeCount
      );

export const getMutualFollowers = (follower, currentUser) =>
  follower?.filter((followId) =>
    currentUser?.following?.some((user) => user?._id === followId._id)
  );
