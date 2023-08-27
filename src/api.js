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
import {axInst} from './axiosInterceptors';
import {
  categoryTypes,
  createCategoryError,
  createCategorySuccess,
  getCategories,
  getCategoriesError,
  getCategoriesSuccess,
} from './redux/actions/categoryActions';

const BASE_API_URL = process.env.REACT_APP_BASE_URL;


export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
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
    const response = await axInst.post(`/user/register`, {...data});
    dispatch({type: authTypes.SIGN_UP_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: authTypes.SIGN_UP_ERROR, payload: error.response.data});
  }
};

export const logIn = (data) => async (dispatch) => {
  try {
    const formData = new FormData();
    // eslint-disable-next-line guard-for-in
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const response = await axInst.post(`/login/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(logInSuccess(response.data));
  } catch (error) {
    dispatch(logInError(error.response.data));
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({type: authTypes.LOG_OUT});
  // todo need to create log out api and call that api
  // try {
  //   await axInst.post(`/auth/log-out/`);
  //   dispatch({type: authTypes.LOG_OUT});
  // } catch (error) {
  //   console.log('error on logout---', error.response);
  // }
};

export const getUserMe = () => async (dispatch) => {
  try {
    const response = await axInst.get(`/user/me`);
    dispatch({type: authTypes.GET_USER_ME_SUCCESS, payload: response.data});
  } catch (error) {
    dispatch({type: authTypes.GET_USER_ME_ERROR, payload: error.response.data});
  }
};

export const getCategoriesRequest = () => async (dispatch) => {
  try {
    const response = await axInst.get(`/category`);
    dispatch(getCategoriesSuccess(response.data));
  } catch (error) {
    dispatch(getCategoriesError(error));
  }
};

export const createCategory = (data) => async (dispatch) => {
  dispatch({type: categoryTypes.CREATE_CATEGORY});
  try {
    const response = await axInst.post(`/category/`, data);
    dispatch(createCategorySuccess(response.data));
  } catch (error) {
    dispatch(createCategoryError(error.response.data));
  }
};
