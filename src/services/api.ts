import axios, {AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && error.response.status !== 401) {
        // eslint-disable-next-line no-alert
        alert('В данный момент сервер недоступен.');
      }

      throw error;
    }
  );

  return api;
};
