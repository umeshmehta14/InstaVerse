import { createContext, useContext, useEffect, useReducer } from "react";
import {
  UnfollowUser,
  addToBookmark,
  followUser,
  getAllUser,
  getSingleUser,
  removeFromBookmark,
} from "./UserApi";
import {
  ALL_USERS,
  SET_BOOKMARK,
  SET_FOLLOW_USER,
  SET_SELECTED_USER,
} from "../../utils/Constants";
import { UserReducer } from "../../reducer/UserReducer/UserReducer";
import { UserInitialState } from "../../reducer/UserReducer/UserInitialState";
import { useAuth } from "../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, UserInitialState);
  const { token, currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

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
    }
  };

  const handleSingleUser = async (username) => {
    try {
      const {
        status,
        data: { user },
      } = await getSingleUser(username);
      if (status === 200 || status === 201) {
        userDispatch({ type: SET_SELECTED_USER, payload: user });
        navigate(`/profile/${username}`);
      }
    } catch (error) {
      console.error(error);
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
    }
  };

  const handleFollow = async (followUserId) => {
    try {
      const { status, data } = await followUser(followUserId, token);

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
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
