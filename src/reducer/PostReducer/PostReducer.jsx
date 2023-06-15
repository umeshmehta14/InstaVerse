import { ALL_POSTS, SET_POSTS } from "../../utils/Constants";

export const PostReducer = (postState, { payload, type }) => {
  switch (type) {
    case ALL_POSTS:
      return { ...postState, posts: payload };

    case SET_POSTS:
      return { ...postState, posts: { payload, ...postState.posts } };

    default:
      break;
  }
};
