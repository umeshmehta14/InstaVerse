import {
  ALL_USERS,
  SET_BOOKMARK,
  SET_FOLLOW_USER,
  SET_SEARCH_VALUE,
  SET_SELECTED_USER,
} from "../../utils/Constants";

export const UserReducer = (
  userState,
  { payload, type, currentUser, setCurrentUser }
) => {
  switch (type) {
    case ALL_USERS:
      return { ...userState, users: payload };

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
      return { ...userState, selectedUser: payload };

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

    default:
      break;
  }
};
