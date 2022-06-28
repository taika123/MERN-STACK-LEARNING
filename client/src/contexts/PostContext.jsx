import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  FIND_POST,
  POST_LOADED_FAILURE,
  POST_LOADED_SUCCESS,
  UPDATE_POST,
} from "./constants";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //handle modal
  const [showModal, setShowModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  //state

  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  });

  //toast show in success add post
  const [showToast, setShowToast] = useState({
    show: true,
    message: "",
    type: null,
  });

  //get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({ type: POST_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: POST_LOADED_FAILURE });
    }
  };

  //add post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      // console.log(error);
      return error.response.data
        ? error.response.data
        : { success: false, message: "serve error" };
    }
  };

  //deletePost
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update POST
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      // console.log(error);
      return error.response.data
        ? error.response.data
        : { success: false, message: "serve error" };
    }
  };

  //find post when user is updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_POST, payload: post });
  };

  //Post context data
  const postContextData = {
    postState,
    getPosts,
    addPost,
    showModal,
    showToast,
    setShowToast,
    setShowModal,
    deletePost,
    updatePost,
    findPost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
