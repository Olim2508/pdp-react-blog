import {categoryTypes} from '../actions/categoryActions';


const initialState = {
  isLoading: false,
  error: '',
  categories: [],
  // category: {},
  success: false,
};


export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryTypes.GET_CATEGORIES:
      return {...state, isLoading: true};
    case categoryTypes.GET_CATEGORIES_SUCCESS:
      return {...state, isLoading: false, categories: action.payload, error: ''};
    case categoryTypes.GET_CATEGORIES_ERROR:
      return {...state, isLoading: false, categories: null, error: action.payload};
    case categoryTypes.GET_CATEGORIES_RESET:
      return {...state, isLoading: false, success: false, error: ''};

      // case postsTypes.GET_POST_DETAIL:
      //   return {...state, isLoading: true};
      // case postsTypes.GET_POST_DETAIL_SUCCESS:
      //   return {...state, isLoading: false, post: action.payload, error: '', success: true};
      // case postsTypes.GET_POST_DETAIL_ERROR:
      //   return {...state, isLoading: false, post: null, error: action.payload, success: false};
      // case postsTypes.GET_POST_DETAIL_RESET:
      //   return {...state, isLoading: false, success: false, error: ''};
      //
      // case postsTypes.DELETE_POST:
      //   return {...state, isLoading: true};
      // case postsTypes.DELETE_POST_SUCCESS:
      //   return {...state, isLoading: false, error: '', success: true};
      // case postsTypes.DELETE_POST_ERROR:
      //   return {...state, isLoading: false, error: action.payload, success: false};
      //
      // case postsTypes.CREATE_POST:
      //   return {...state, isLoading: true};
      // case postsTypes.CREATE_POST_SUCCESS:
      //   return {...state, isLoading: false, error: '', success: true, posts: [...state.posts, action.payload]};
      // case postsTypes.CREATE_POST_ERROR:
      //   return {...state, isLoading: false, error: action.payload, success: false};
      //
      // case postsTypes.UPDATE_POST:
      //   return {...state, isLoading: true};
      // case postsTypes.UPDATE_POST_SUCCESS:
      //   return {...state, isLoading: false, error: '', success: true, post: action.payload};
      // case postsTypes.UPDATE_POST_ERROR:
      //   return {...state, isLoading: false, error: action.payload, success: false};

    default: return state;
  }
};
