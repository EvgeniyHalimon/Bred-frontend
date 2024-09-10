import { defineStore } from 'pinia';
import type { IArticle } from './shared/types';

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
