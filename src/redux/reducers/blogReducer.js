import { postsTypes } from "../actions/types";

const initialState = {
    isLoading: false,
    error: '',
    posts: [],
    post: {},
    success: false
};
  
export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case postsTypes.GET_POSTS:
            return {...state, isLoading: true}
        case postsTypes.GET_POSTS_SUCCESS:
            return {...state, isLoading: false, posts: action.payload, error: ''}
        case postsTypes.GET_POSTS_ERROR:
            return {...state, isLoading: false, posts: null, error: action.payload}
        case postsTypes.GET_POSTS_RESET:
            return {...state, isLoading: false}

        case postsTypes.GET_POST_DETAIL:
            return {...state, isLoading: true}
        case postsTypes.GET_POST_DETAIL_SUCCESS:
            return {...state, isLoading: false, post: action.payload, error: ''}
        case postsTypes.GET_POST_DETAIL_ERROR:
            return {...state, isLoading: false, post: null, error: action.payload}

        case postsTypes.DELETE_POST:
            return {...state, isLoading: true}
        case postsTypes.DELETE_POST_SUCCESS:
            return {...state, isLoading: false, error: '', success: true}
        case postsTypes.DELETE_POST_ERROR:
            return {...state, isLoading: false, error: action.payload, success: false}
        default: return state
    }
}