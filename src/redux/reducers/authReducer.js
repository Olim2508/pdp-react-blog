import {authTypes} from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  success: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SIGN_UP:
      return {...state, isLoading: true};
    case authTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        error: null,
        success: true,
      };
    case authTypes.SIGN_UP_ERROR:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
