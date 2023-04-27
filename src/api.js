import {getPosts, getPostsError, getPostsSuccess, postsTypes} from "./redux/actions/types";


export const getPostsRequest = () => {
  return (dispatch) => {
    dispatch(getPosts()); // for the loading state
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
          dispatch(getPostsSuccess(data))
        })
  };
}
//
//
// export const fetchData = () => async (dispatch) => {
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await response.json();
//     dispatch({ type: postsTypes.GET_POSTS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: postsTypes.GET_POSTS_ERROR, error });
//   }
// };

export const fetchPosts = () => {
  return (dispatch) => {
    dispatch(getPosts());
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => dispatch(getPostsSuccess(data)))
      .catch((error) => dispatch(getPostsError(error)));
  };
};
