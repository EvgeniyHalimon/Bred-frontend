<script setup lang="ts">
import type { OrderType } from '@/shared/types';
import { useArticleStore, useUserStore } from '@/store';
import { reactive, watchEffect } from 'vue';
import { ArticleItem } from '.';

const articlesStore = useArticleStore();
const userStore = useUserStore();
const authorId = userStore.userId;

const articleParams = reactive({
  page: 1,
  limit: 10,
  order: 'ASC' as OrderType,
  orderBy: 'rating'
});

const articles = articlesStore.getArticlesState;
console.log('🚀 ~ file: UserArticles.vue:19 ~ articles:', articles);

const getArticles = async () => {
  const { data } = await articlesStore.fetchArticles({
    authorId: authorId,
    ...articleParams
  });
  if (data.articles) {
    articlesStore.setArticles(data.articles);
  }
};

const changePage = (newPage: number) => {
  articleParams.page = newPage;
};

const changeOrder = (newOrder: OrderType) => {
  articleParams.order = newOrder;
};

watchEffect(() => {
  getArticles();
});
</script>

<template>
  <div class="flex flex-wrap justify-between gap-8 my-4">
    <ArticleItem :articles="articles" />
  </div>
</template>
