import {
  ALL_USERS,
  SET_BOOKMARK,
  SET_DEFAULT_TAB,
  SET_EDIT_USER,
  SET_FOLLOW_USER,
  SET_LOADING_USERS,
  SET_SEARCH_VALUE,
  SET_SELECTED_USER,
  SET_UNFOLLOW_USER,
} from "../../utils/Constants";

export const UserReducer = (
  userState,
  { payload, type, currentUser, setCurrentUser }
) => {
  switch (type) {
    case ALL_USERS:
      return { ...userState, users: payload };

    case SET_EDIT_USER:
      return {
        ...userState,
        users: userState.users.map((user) =>
          user.username === payload.username ? { ...user, ...payload } : user
        ),
      };

    case SET_BOOKMARK:
      return { ...userState, userBookmarks: payload };

    case SET_FOLLOW_USER:
      return {
        ...userState,
        users: userState.users.map((oldUser) => {
          const updatedUser = payload.find(({ _id }) => _id === oldUser._id);

          if (currentUser._id === updatedUser?._id) {
            setCurrentUser(updatedUser);
          }
          return updatedUser ? updatedUser : oldUser;
        }),
      };

    case SET_SELECTED_USER:
      return { ...userState, selectedUser: { ...payload } };

    case SET_SEARCH_VALUE:
      const userKey = payload;
      return {
        ...userState,
        searchValue: payload,
        searchedUsers: userState.users.filter(
          ({ username, firstName, lastName }) =>
            username === currentUser?.username
              ? false
              : username.toLowerCase().includes(userKey.toLowerCase()) ||
                firstName.toLowerCase().includes(userKey.toLowerCase()) ||
                lastName.toLowerCase().includes(userKey.toLowerCase())
        ),
      };

    case SET_DEFAULT_TAB:
      return { ...userState, defaultTab: payload };

    case SET_UNFOLLOW_USER:
      return { ...userState, unfollowUser: payload };

    case SET_LOADING_USERS:
      return { ...userState, loadingUsers: payload };

    default:
      break;
  }
};
