export const postsTypes = {
    GET_POSTS: "GET_POSTS",
    GET_POSTS_SUCCESS: "GET_POSTS_SUCCESS",
    GET_POSTS_ERROR: "GET_POSTS_ERROR",
};

export const getPosts = () => ({
    type: postsTypes.GET_POSTS
});

export const getPostsSuccess = (payload) => ({
    type: postsTypes.GET_POSTS_SUCCESS,
    payload: payload
});

export const getPostsError = (error) => ({
  type: postsTypes.GET_POSTS_ERROR,
  payload: error,
});