import { defineStore } from 'pinia';
import axiosWorker from '../shared/axios';
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  saveTokens,
  setUserInLocalStorage
} from '../shared/tokenWorkshop';
import { routesByModule } from '../shared/constants';

const {
  AUTH: { LOGIN, REGISTER }
} = routesByModule;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => {
    return {
      accessToken: undefined,
      refreshToken: undefined
    };
  },
  getters: {
    accessTokenFromLocalStorage() {
      return getAccessToken();
    },
    refreshTokenFromLocalStorage() {
      return getRefreshToken();
    }
  },
  actions: {
    async login(values: { email: string; password: string }) {
      const result = await axiosWorker().post(LOGIN, values);
      const { accessToken, refreshToken, user } = result.data;
      if (accessToken && refreshToken && user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        saveTokens({ accessToken, refreshToken });
        setUserInLocalStorage(user);
      }
      return !!accessToken && !!refreshToken;
    },
    async register(values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      bio: string;
    }) {
      await axiosWorker().post(REGISTER, values);
    },
    logout() {
      removeTokens();
      this.accessToken = undefined;
      this.refreshToken = undefined;
    }
  }
});
