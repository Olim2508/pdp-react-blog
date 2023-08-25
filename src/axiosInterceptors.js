import axios from 'axios';
import {getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from './api';

const BASE_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const REFRESH_URL = '/auth/api/token/refresh/';

export const axInst = axios.create({
  baseURL: `${BASE_SERVER_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error) => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  window.location.href = '/log-in';
  return Promise.reject(error);
};

const axiosRequestInterceptor = (request) => {
  if (getAccessToken()) {
    request.headers['Authorization'] = `Bearer ${getAccessToken()}`;
  }
  return request;
};

const axiosResponseInterceptor = (response) => {
  return response;
};

const axiosResponseErrorInterceptor = (error) => {
  const originalRequest = error.config;
  console.log('error', error, typeof error);
  if (error.response.status === 401 && error.config.url !== REFRESH_URL) {
    const refresh = getRefreshToken();
    if (refresh) {
      return axInst
          .post(`${REFRESH_URL}`, {refresh})
          .then((response) => {
            setAccessToken(response.data.access);
            setRefreshToken(response.data.refresh);
            // console.log('saved new access and refresh token');
            // Retry the original request with the new access token.
            response.config.headers['Authorization'] = `Bearer ${response.data.access}`;
            return axInst(originalRequest);
          })
          .catch((error) => {
            return handleError(error);
          });
    } else {
      return handleError(error);
    }
  }
  return handleError(error);
};


axInst.interceptors.request.use(axiosRequestInterceptor, (error) => Promise.reject(error));
axInst.interceptors.response.use(axiosResponseInterceptor, axiosResponseErrorInterceptor);
