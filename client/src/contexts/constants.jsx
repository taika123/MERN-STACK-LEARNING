export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "http://localhost:5000/api"
    : // : "https://fathomless-temple-42878.herokuapp.com/api";
      //   "someURL"
      "https://secret-badlands-92990.herokuapp.com/api";

export const LOCAL_STORAGE_TOKEN_NAME = "mern-learn";

export const POST_LOADED_SUCCESS = "POST_LOADED_SUCCESS";
export const POST_LOADED_FAILURE = "POST_LOADED_FAILURE";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
