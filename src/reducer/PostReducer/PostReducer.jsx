import {
  ALL_POSTS,
  SET_ALL_USER_POSTS,
  SET_FILTER,
  SET_EDIT_USER_POST,
} from "../../utils/Constants";

export const PostReducer = (postState, { payload, type }) => {
  switch (type) {
    case ALL_POSTS:
      return { ...postState, posts: payload };

    case SET_FILTER:
      return { ...postState, filter: payload };

    case SET_ALL_USER_POSTS:
      return { ...postState, userAllPost: payload };

    case SET_EDIT_USER_POST:
      return {
        ...postState,
        posts: postState.posts.map((user) =>
          user.username === payload.username
            ? {
                ...user,
                avatarURL: payload.avatarURL,
                firstName: payload.firstName,
                lastName: payload.lastName,
                bio: payload.bio,
                portfolio: payload.portfolio,
              }
            : user
        ),
      };

    default:
      break;
  }
};
