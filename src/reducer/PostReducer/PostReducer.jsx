import {
  ALL_POSTS,
  SET_ALL_USER_POSTS,
  SET_FILTER,
  SET_EDIT_USER_POST,
  SET_EDIT_POST,
  SET_SINGLE_POST,
  SET_PAGE,
  SET_POSTVALUE,
  SET_ISPOSTLOADING,
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

    case SET_EDIT_POST:
      return { ...postState, editPost: payload };

    case SET_SINGLE_POST:
      return { ...postState, singlePost: payload };

    case SET_PAGE:
      return { ...postState, page: payload };

    case SET_POSTVALUE:
      return { ...postState, postValue: payload };

    case SET_ISPOSTLOADING:
      return { ...postState, isPostLoading: payload };

    default:
      break;
  }
};
