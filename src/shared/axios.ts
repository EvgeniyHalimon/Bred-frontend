import axios from 'axios';
import { BASE_URL, routesByModule } from './constants';
import { getAccessToken, saveTokens, getRefreshToken, removeTokens } from './tokenWorkshop';

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
    return axiosInstance.put(`${url}`, data, { params });
  };

  const purge = (url: string, data?: any): Promise<any> => {
    return axiosInstance.delete(`${url}`, data);
  };

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalRequest = err.config;
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${refreshToken}`;
      if (err.response.status === 401 && err.response) {
        try {
          const response = await get(routesByModule.AUTH.REFRESH);
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
            return error.response.data;
          }
          return error.response.data;
        }
      }
      return err.response.data;
    }
  );

  return { get, post, put, patch, purge };
};

export default axiosWorker;
