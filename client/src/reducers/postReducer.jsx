import {
  ADD_POST,
  DELETE_POST,
  FIND_POST,
  POST_LOADED_FAILURE,
  UPDATE_POST,
} from "../contexts/constants";
import { POST_LOADED_SUCCESS } from "./../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_LOADED_SUCCESS: {
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      };
    }

    case POST_LOADED_FAILURE: {
      return {
        ...state,
        posts: [],
        postsLoading: false,
      };
    }

    case ADD_POST: {
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    }

    case UPDATE_POST: {
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        posts: newPosts,
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    }

    case FIND_POST: {
      return {
        ...state,
        post: payload,
      };
    }

    default:
      return state;
  }
};
