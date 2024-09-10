import { defineStore } from 'pinia';
import type { IArticle } from './shared/types';

export const useArticleStore = defineStore('articles', {
  state: () => ({ articles: [] as IArticle[] }),
  getters: {
    articles: (state) => state.articles
  },
  actions: {
    increment(articles: IArticle[]) {
      this.articles = articles;
    }
  }
});
