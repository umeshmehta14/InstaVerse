import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { PostInitialState } from "../../reducer/PostReducer/PostInitialState";
import { PostReducer } from "../../reducer/PostReducer/PostReducer";
import { getAllPosts } from "./PostApi";
import { ALL_POSTS } from "../../utils/Constants";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(PostReducer, PostInitialState);

  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const {
        status,
        data: { posts },
      } = await getAllPosts();
      console.log(posts);
      if (status === 200 || status === 201) {
        postDispatch({ type: ALL_POSTS, payload: posts });
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
    <PostContext.Provider value={{ loading, postDispatch, postState }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
