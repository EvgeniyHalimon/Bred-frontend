import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
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

  const setArticle = (newArticle: IArticleWithInfo) => {
    article.value = newArticle;
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

  /* watch(
    () => articles,
    (newArticles) => {
      console.log(
        '🚀 ~ file: articlesStore.ts:50 ~ useArticleStore ~ newArticles:',
        newArticles.value
      );
      articles.value = newArticles.value;
    },
    { deep: true, immediate: true }
  );

  watch(
    () => article,
    (newArticle) => {
      article.value = newArticle.value;
    },
    { deep: true }
  ); */

  return {
    articles,
    article,
    getArticlesState,
    getArticleState,
    setArticles,
    setArticle,
    fetchArticle,
    fetchArticles,
    deleteArticle,
    createArticle,
    patchArticle
  };
});
