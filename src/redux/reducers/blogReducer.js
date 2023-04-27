import { postsTypes } from "../actions/types";

const initialState = {
    isLoading: false,
    error: '',
    posts: [],
};
  
export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case postsTypes.GET_POSTS:
            return {...state, isLoading: true}
        case postsTypes.GET_POSTS_SUCCESS:
            return {...state, isLoading: false, posts: action.payload, error: ''}
        case postsTypes.GET_POSTS_ERROR:
            return {...state, isLoading: false, posts: null, error: action.payload}
        default: return state
    }
}