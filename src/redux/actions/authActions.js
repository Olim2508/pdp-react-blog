
export const authTypes = {
  SIGN_UP: 'SIGN_UP',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_ERROR: 'SIGN_UP_ERROR',
  SIGN_UP_RESET: 'SIGN_UP_RESET',
};


export const signUpSuccess = (user) => ({
  type: authTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpError = (error) => ({
  type: authTypes.SIGN_UP_ERROR,
  payload: error,
});

