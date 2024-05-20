import { createContext, useContext, useReducer } from "react";
import { toast } from "react-hot-toast";

import { addToBookmark, editUser, removeFromBookmark } from "./UserApi";
import { UserReducer } from "../../reducer/UserReducer/UserReducer";
import { UserInitialState } from "../../reducer/UserReducer/UserInitialState";
import { usePost } from "../index";
import {
  SET_BOOKMARK,
  SET_EDIT_USER,
  SET_EDIT_USER_POST,
} from "../../utils/Constants";
import { useSelector } from "react-redux";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, UserInitialState);
  const { postDispatch } = usePost();
  const { token } = useSelector((state) => state.authentication);

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

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
        handleBookmark,
        handleRemoveBookmark,
        handleEditUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
