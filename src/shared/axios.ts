import axios from 'axios';
import { BASE_URL, routesByModule } from './constants';
import {
  getAccessToken,
  saveTokens,
  getRefreshToken,
  removeTokens,
  removeUserFromLocalStorage
} from './tokenWorkshop';

const axiosWorker = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  const get = (url: string, params?: any): Promise<any> => {
    return axiosInstance.get(`${url}`, { params });
  };

  const post = (url: string, data: any, params?: any): Promise<any> => {
    return axiosInstance.post(`${url}`, data, { params });
  };

  const put = (url: string, data: any, params?: any): Promise<any> => {
    return axiosInstance.put(`${url}`, data, { params });
  };

  const patch = (url: string, data: any, params?: any): Promise<any> => {
    const headers =
      data instanceof FormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' };

    return axiosInstance.patch(`${url}`, data, {
      params,
      headers
    });
  };

  const purge = (url: string, data?: any): Promise<any> => {
    return axiosInstance.delete(`${url}`, data);
  };

  let requestCount = 0;
  if (requestCount > 1) {
    removeTokens();
    removeUserFromLocalStorage();
    return {
      get,
      post,
      put,
      patch,
      purge
    };
  }
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalRequest = err.config;
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${refreshToken}`;
      if (err.response.status === 401 && getRefreshToken()) {
        try {
          const response = await get(routesByModule.AUTH.REFRESH);
          requestCount++;

          if (response?.status === 200) {
            saveTokens(response.data);

            return axiosInstance({
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: `Bearer ${response.data.accessToken}`
              }
            });
          }
        } catch (error: any) {
          if (error.response && error.response.data) {
            removeTokens();
            removeUserFromLocalStorage();
            return error.response.data;
          }
        }
      }

      return Promise.reject(err);
    }
  );

  return { get, post, put, patch, purge };
};

export default axiosWorker;
