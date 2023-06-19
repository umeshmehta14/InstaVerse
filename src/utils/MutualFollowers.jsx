export const getMutualFollowers = (followers, currentUser) =>
  followers?.filter(({ username }) =>
    currentUser?.following?.some((user) => user?.username === username)
  );
