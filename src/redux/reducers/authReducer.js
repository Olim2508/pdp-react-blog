import {authTypes} from '../actions/authActions';
import {getToken} from '../../api';

const token = getToken();

const initialState = {
  user: null,
  error: null,
  isLoading: false,
  success: false,
  isAuthenticated: !!token,
  token: null,
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
    case authTypes.SIGN_UP_RESET:
      return {
        ...state,
        error: null,
        isLoading: false,
        success: false,
      };

    case authTypes.LOGIN:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        success: true,
        token: action.payload,
        isAuthenticated: true,
      };
    case authTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        success: false,
      };
    case authTypes.LOGIN_RESET:
      return {
        ...state,
        error: null,
        isLoading: false,
        success: false,
      };
    case authTypes.LOG_OUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
