import { defineStore } from 'pinia';
import type { IArticle } from './shared/types';
import axiosWorker from './shared/axios';
import { getAccessToken, getRefreshToken, removeTokens, saveTokens } from './shared/tokenWorkshop';
import { routesByModule } from './shared/constants';

const {
  AUTH: { LOGIN, REGISTER }
} = routesByModule;

export const useArticleStore = defineStore({
  id: 'articles',
  state: () => {
    return {
      articles: [] as IArticle[]
    };
  },
  getters: {
    getArticles: (state) => state.articles
  },
  actions: {
    setArticles(articles: IArticle[]) {
      this.articles = articles;
    }
  }
});

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
    async login(values: any) {
      const result = await axiosWorker().post(LOGIN, values);
      const { accessToken, refreshToken } = result.data;
      if (accessToken && refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        saveTokens({ accessToken, refreshToken });
      }
      return !!accessToken && !!refreshToken;
    },
    async register(values: any) {
      await axiosWorker().post(REGISTER, values);
    },
    logout() {
      removeTokens();
      this.accessToken = undefined;
      this.refreshToken = undefined;
    }
  }
});
