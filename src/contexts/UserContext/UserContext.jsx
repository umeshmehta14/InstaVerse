import { createContext, useContext, useEffect, useReducer } from "react";
import { addToBookmark, getAllUser, getSingleUser, removeFromBookmark } from "./UserApi";
import { ALL_USERS, SET_BOOKMARK } from "../../utils/Constants";
import { UserReducer } from "../../reducer/UserReducer/UserReducer";
import { UserInitialState } from "../../reducer/UserReducer/UserInitialState";
import { useAuth } from "../AuthContext/AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, UserInitialState);
  const {token} = useAuth();

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

  const handleBookmark = async (postId)=>{
    try {
        const {
            status,
            data: { bookmarks },
          } = await addToBookmark(postId, token);
          if (status === 200 || status === 201) {
          userDispatch({type:SET_BOOKMARK, payload: bookmarks});
        }
    } catch (error) {
        console.error(error)
    }
  }
  const handleRemoveBookmark = async (postId)=>{
    try {
        const {
            status,
            data: { bookmarks },
          } = await removeFromBookmark(postId, token);
          if (status === 200 || status === 201) {
          userDispatch({type:SET_BOOKMARK, payload: bookmarks});
        }
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ userState, userDispatch, handleBookmark, handleRemoveBookmark }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
