import {
  ALL_POSTS,
  SET_ALL_USER_POSTS,
  SET_FILTER,
} from "../../utils/Constants";

export const PostReducer = (postState, { payload, type }) => {
  switch (type) {
    case ALL_POSTS:
      return { ...postState, posts: payload };

    case SET_FILTER:
      return { ...postState, filter: payload };

    case SET_ALL_USER_POSTS:
      return { ...postState, userAllPost: payload };

    default:
      break;
  }
};
