import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { InitialState } from "../../reducer/InitialState";
import { DataReducer } from "../../reducer/DataReducer";
import { getAllPosts } from "./PostApi";
import { ALL_POSTS } from "../../utils/Constants";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {

  const [state, dispatch] = useReducer(DataReducer, InitialState);

  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const {
        status,
        data: { posts },
      } = await getAllPosts();
      if (status === 200 || status === 201) {
        dispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider value={{ loading, dispatch, state }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
