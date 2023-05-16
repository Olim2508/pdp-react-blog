import {
  createPostError,
  createPostSuccess,
  deletePost,
  deletePostSuccess,
  getPostDetail,
  getPostDetailError,
  getPostDetailSuccess,
  getPosts,
  getPostsError,
  getPostsSuccess,
  postsTypes,
  updatePostError,
  updatePostSuccess,
} from './redux/actions/blogActions';
import {authTypes, logInError, logInSuccess} from './redux/actions/authActions';
import axios from 'axios';

const BASE_API_URL = process.env.REACT_APP_BASE_URL;
const BASE_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getPostsRequest = (dispatch) => {
  dispatch(getPosts());
  fetch(`${BASE_API_URL}/blogs`)
      .then((response) => response.json())
      .then((data) => dispatch(getPostsSuccess(data)))
      .catch((error) => dispatch(getPostsError(error)));
};

export const getPostDetailRequest = (dispatch, id) => {
  dispatch(getPostDetail());
  fetch(`${BASE_API_URL}/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => dispatch(getPostDetailSuccess(data)))
      .catch((error) => dispatch(getPostDetailError(error)));
};

export const deletePostRequest = (dispatch, id) => {
  dispatch(deletePost());
  const headers = {'Content-Type': 'application/json'};
  const options = {
    method: 'DELETE',
    headers: headers,
  };
  fetch(`${BASE_API_URL}/blogs/${id}`, options)
      .then((response) => response.json())
      .then((data) => dispatch(deletePostSuccess()))
      .catch((error) => dispatch(getPostDetailError(error)));
};

export const createPostRequest = (dispatch, data) => {
  dispatch({type: postsTypes.CREATE_POST});
  const headers = {'Content-Type': 'application/json'};
  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
  };
  fetch(`${BASE_API_URL}/blogs/`, options)
      .then((response) => response.json())
      .then((data) => dispatch(createPostSuccess(data)))
      .catch((error) => dispatch(createPostError(error)));
};


export const updatePostRequest = (dispatch, id, data) => {
  dispatch({type: postsTypes.UPDATE_POST});
  const headers = {'Content-Type': 'application/json'};
  const options = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data),
  };
  fetch(`${BASE_API_URL}/blogs/${id}`, options)
      .then((response) => response.json())
      .then((data) => dispatch(updatePostSuccess(data)))
      .catch((error) => dispatch(updatePostError(error)));
};


export const signUp = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_SERVER_URL}/auth/sign-up/`, {...data});
    dispatch({type: authTypes.SIGN_UP_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: authTypes.SIGN_UP_ERROR, payload: error.response.data});
  }
};

export const logIn = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_SERVER_URL}/auth/sign-in/`, {...data});
    dispatch(logInSuccess(response.data));
  } catch (error) {
    console.log('error on login---', error);
    dispatch(logInError(error.response.data));
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await axios.post(`${BASE_SERVER_URL}/auth/log-out/`);
    dispatch({type: authTypes.LOG_OUT});
  } catch (error) {
    console.log('error on logout---', error.response);
  }
};


// export const signUp = (dispatch, data) => {
//   dispatch({type: authTypes.SIGN_UP});
//   const headers = {'Content-Type': 'application/json'};
//   const options = {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(data),
//   };
//   fetch(`${BASE_API_URL}/blogs/`, options)
//       .then((response) => response.json())
//       .then((data) => dispatch(signUpSuccess(data)))
//       .catch((error) => dispatch(signUpError(error)));
// };

// export const fetchPosts = () => {
//   return (dispatch) => {
//     dispatch(getPosts());
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then((response) => response.json())
//       .then((data) => dispatch(getPostsSuccess(data)))
//       .catch((error) => dispatch(getPostsError(error)));
//   };
// };

// export const getPostsRequest = () => {
//   return (dispatch) => {
//     dispatch(getPosts()); // for the loading state
//     return fetch('https://jsonplaceholder.typicode.com/posts')
//         .then((res) => res.json())
//         .then((data) => {
//           dispatch(getPostsSuccess(data))
//         })
//   };
// }
