export const postFilter = (posts, filter) =>
  filter === "latest"
    ? [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [...posts.filter(({ likes }) => likes.likeCount > 0)].sort(
        (a, b) => b.likes.likeCount - a.likes.likeCount
      );
