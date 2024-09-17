import { defineStore } from 'pinia';
import type { IArticle, IArticles } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';
import { computed } from 'vue';

const {
  ARTICLES: { GET_ALL, GET_BY_ID, PATCH, CREATE, DELETE }
} = routesByModule;

export const useArticleStore = defineStore({
  id: 'articles',
  state: () => {
    return {
      articles: [] as IArticles[],
      article: {} as IArticle
    };
  },
  getters: {
    getArticlesState: (state) => computed(() => state.articles),
    getArticleState: (state) => computed(() => state.article)
  },
  actions: {
    setArticles(articles: IArticles[]) {
      this.articles = articles;
    },
    setArticle(article: IArticle) {
      this.article = article;
    },
    getArticle(id: string) {
      return axiosWorker().get(`${GET_BY_ID}/${id}`);
    },
    getArticles(params: any) {
      return axiosWorker().get(GET_ALL, params);
    },
    deleteArticle(id: string) {
      return axiosWorker().purge(`${DELETE}/${id}`);
    },
    createArticle(data: any) {
      return axiosWorker().purge(CREATE, data);
    },
    patchArticle(data: Partial<IArticle>, id: string) {
      return axiosWorker().patch(`${PATCH}/${id}`, data);
    }
  }
});
