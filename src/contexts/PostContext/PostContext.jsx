import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { PostInitialState } from "../../reducer/PostReducer/PostInitialState";
import { PostReducer } from "../../reducer/PostReducer/PostReducer";
import {
  createPost,
  getAllPosts,
  getAllUserPost,
  likePost,
  unLikePost,
} from "./PostApi";
import { ALL_POSTS, SET_ALL_USER_POSTS } from "../../utils/Constants";
import { useAuth } from "../index";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(PostReducer, PostInitialState);
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const {
        status,
        data: { posts },
      } = await getAllPosts();
      if (status === 200 || status === 201) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAllUserPosts = async (username) => {
    try {
      const {
        status,
        data: { posts },
      } = await getAllUserPost(username);
      if (status === 200 || status === 201) {
        postDispatch({ type: SET_ALL_USER_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async (postDetail) => {
    try {
      const {
        status,
        data: { posts },
      } = await createPost(token, postDetail);
      if (status === 200 || status === 201) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostLike = async (postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await likePost(postId, token);
      if (status === 201 || status === 200) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostUnLike = async (postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await unLikePost(postId, token);
      if (status === 201 || status === 200) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        loading,
        postDispatch,
        postState,
        handlePostLike,
        handlePostUnLike,
        handleCreatePost,
        getAllUserPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
