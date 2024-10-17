import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IArticle, IArticleWithInfo } from '../shared/types';
import axiosWorker from '../shared/axios';
import { routesByModule } from '../shared/constants';

const {
  ARTICLES: { GET_ALL, GET_BY_ID, PATCH, CREATE, DELETE }
} = routesByModule;

export const useArticleStore = defineStore('article', () => {
  const articles = ref<IArticleWithInfo[]>([]);
  const article = ref<IArticleWithInfo | null>(null);

  const getArticlesState = computed(() => articles.value);
  const getArticleState = computed(() => article.value);

  const setArticles = (newArticles: IArticleWithInfo[]) => {
    articles.value = newArticles;
  };

  const setArticle = (newArticle: IArticleWithInfo | null) => {
    article.value = newArticle;
  };

  const updateArticle = (newArticle: IArticleWithInfo) => {
    Object.assign(article, { ...article.value, ...newArticle });
  };

  const updateReactionsFromStore = (newArticle: IArticleWithInfo) => {
    const index = articles.value.findIndex((article) => article.id === newArticle.id);

    if (index !== -1) {
      Object.assign(articles.value[index], { ...articles.value[index], ...newArticle });
    }
  };

  const fetchArticle = (id: string) => {
    return axiosWorker().get(`${GET_BY_ID}/${id}`);
  };

  const fetchArticles = async (params: any) => {
    return axiosWorker().get(GET_ALL, params);
  };

  const deleteArticle = (id: string) => {
    return axiosWorker().purge(`${DELETE}/${id}`);
  };

  const createArticle = (data: any) => {
    return axiosWorker().post(CREATE, data);
  };

  const patchArticle = (data: Partial<IArticle>, id: string) => {
    return axiosWorker().patch(`${PATCH}/${id}`, data);
  };

  return {
    articles,
    article,
    getArticlesState,
    getArticleState,
    setArticles,
    updateArticle,
    updateReactionsFromStore,
    setArticle,
    fetchArticle,
    fetchArticles,
    deleteArticle,
    createArticle,
    patchArticle
  };
});
