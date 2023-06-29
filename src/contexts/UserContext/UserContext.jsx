import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-hot-toast";

import {
  UnfollowUser,
  addToBookmark,
  editUser,
  followUser,
  getAllUser,
  getSingleUser,
  removeFromBookmark,
} from "./UserApi";
import { UserReducer } from "../../reducer/UserReducer/UserReducer";
import { UserInitialState } from "../../reducer/UserReducer/UserInitialState";
import { useAuth, usePost } from "../index";
import {
  ALL_USERS,
  SET_BOOKMARK,
  SET_EDIT_USER,
  SET_EDIT_USER_POST,
  SET_FOLLOW_USER,
  SET_LOADING_USERS,
  SET_SELECTED_USER,
} from "../../utils/Constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, UserInitialState);
  const { users, loadingUsers } = userState;
  const { postDispatch } = usePost();
  const { token, currentUser, setCurrentUser, setProgress } = useAuth();

  const getUsers = async () => {
    try {
      const {
        status,
        data: { users },
      } = await getAllUser();
      if (status === 200 || status === 201) {
        userDispatch({ type: ALL_USERS, payload: users });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleSingleUser = async (username) => {
    setProgress(20);
    try {
      const {
        status,
        data: { user },
      } = await getSingleUser(username);
      setProgress(40);
      if (status === 200 || status === 201) {
        userDispatch({ type: SET_SELECTED_USER, payload: user });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setProgress(100);
    }
  };

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
      const { status, data } = await UnfollowUser(unfollowUserId, token);
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

  useEffect(() => {
    getUsers();
  }, [users]);

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
        handleUnfollow,
        handleFollow,
        handleBookmark,
        handleRemoveBookmark,
        handleSingleUser,
        handleEditUser,
        handleFollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
