import { ALL_POSTS, SET_FILTER } from "../../utils/Constants";

export const PostReducer = (postState, { payload, type }) => {
  switch (type) {
    case ALL_POSTS:
      return { ...postState, posts: payload };

    case SET_FILTER:
      return { ...postState, filter: payload };

    default:
      break;
  }
};
