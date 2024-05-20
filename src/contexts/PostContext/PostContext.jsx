import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-hot-toast";

import { PostInitialState } from "../../reducer/PostReducer/PostInitialState";
import { PostReducer } from "../../reducer/PostReducer/PostReducer";
import {
  editPost,
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getAllUserPost,
  getSinglePost,
  likePost,
  unLikePost,
} from "./PostApi";
import {
  ALL_POSTS,
  SET_ALL_USER_POSTS,
  SET_SINGLE_POST,
} from "../../utils/Constants";
import { useSelector } from "react-redux";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(PostReducer, PostInitialState);
  const { token } = useSelector((state) => state.authentication);

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
      toast.error("Something went wrong");
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
      toast.error("Something went wrong");
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
      toast.error("Something went wrong");
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
      toast.error("Something went wrong");
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
      toast.error("Something went wrong");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await deletePost(postId, token);
      if (status === 201 || status === 200) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleEditPost = async (postData) => {
    try {
      const {
        status,
        data: { posts },
      } = await editPost(postData, token);
      if (status === 201 || status === 200) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleSinglePost = async (postId) => {
    try {
      const {
        status,
        data: { post },
      } = await getSinglePost(postId);
      if (status === 201 || status === 200) {
        postDispatch({ type: SET_SINGLE_POST, payload: post });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      postDispatch({ type: SET_SINGLE_POST, payload: {} });
    }
  };

  const handleCreateComment = async (commentData, postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await createComment(postId, commentData, token);
      if (status === 201 || status === 200) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    try {
      const {
        status,
        data: { posts },
      } = await deleteComment(commentId, postId, token);
      if (status === 201 || status === 200) {
        postDispatch({ type: ALL_POSTS, payload: posts });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleShare = async (_id) => {
    try {
      await navigator.share({
        title: "Instaverse",
        text: "Check out this post",
        url: `https://instaverse-um14.netlify.app/post/${_id}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

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
        handleDeletePost,
        handleEditPost,
        handleSinglePost,
        handleCreateComment,
        handleDeleteComment,
        handleShare,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
