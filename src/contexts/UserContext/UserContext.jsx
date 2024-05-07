import { createContext, useContext, useReducer } from "react";
import { toast } from "react-hot-toast";

import {
  unfollowUser,
  addToBookmark,
  editUser,
  followUser,
  removeFromBookmark,
} from "./UserApi";
import { UserReducer } from "../../reducer/UserReducer/UserReducer";
import { UserInitialState } from "../../reducer/UserReducer/UserInitialState";
import { usePost } from "../index";
import {
  SET_BOOKMARK,
  SET_EDIT_USER,
  SET_EDIT_USER_POST,
  SET_FOLLOW_USER,
  SET_LOADING_USERS,
} from "../../utils/Constants";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, UserInitialState);
  const { loadingUsers } = userState;
  const { postDispatch } = usePost();
  const { currentUser, token } = useSelector((state) => state.authentication);

  const handleEditUser = async (userData) => {
    try {
      const {
        status,
        data: { user },
      } = await editUser(userData, token);
      if (status === 200 || status === 201) {
        setCurrentUser(user);
        userDispatch({ type: SET_EDIT_USER, payload: user });
        postDispatch({ type: SET_EDIT_USER_POST, payload: user });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleBookmark = async (postId) => {
    try {
      const {
        status,
        data: { bookmarks },
      } = await addToBookmark(postId, token);
      if (status === 200 || status === 201) {
        userDispatch({ type: SET_BOOKMARK, payload: bookmarks });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleRemoveBookmark = async (postId) => {
    try {
      const {
        status,
        data: { bookmarks },
      } = await removeFromBookmark(postId, token);
      if (status === 200 || status === 201) {
        userDispatch({ type: SET_BOOKMARK, payload: bookmarks });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleFollow = async (followUsername) => {
    try {
      const { status, data } = await followUser(followUsername, token);

      if (status === 200 || status === 201) {
        userDispatch({
          type: SET_FOLLOW_USER,
          payload: [data.user, data.followUser],
          currentUser,
          setCurrentUser,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleUnfollow = async (unfollowUserId) => {
    try {
      const { status, data } = await unfollowUser(unfollowUserId, token);
      if (status === 200 || status === 201) {
        userDispatch({
          type: SET_FOLLOW_USER,
          payload: [data.user, data.followUser],
          currentUser,
          setCurrentUser,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleFollowUser = async (username, unfollow) => {
    userDispatch({
      type: SET_LOADING_USERS,
      payload: [...loadingUsers, username],
    });
    if (unfollow) {
      await handleUnfollow(username);
    } else {
      await handleFollow(username);
    }

    userDispatch({
      type: SET_LOADING_USERS,
      payload: loadingUsers.filter((user) => user !== username),
    });
  };

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
        handleUnfollow,
        handleFollow,
        handleBookmark,
        handleRemoveBookmark,
        handleEditUser,
        handleFollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
