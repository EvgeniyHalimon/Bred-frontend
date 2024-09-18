<script setup lang="ts">
import type { OrderType } from '@/shared/types';
import { useArticleStore, useUserStore } from '@/store';
import { reactive, watchEffect } from 'vue';
import { ArticleItem } from '@/components';
const articlesStore = useArticleStore();
const userStore = useUserStore();

const articleParams = reactive({
  page: 1,
  limit: 10,
  order: 'ASC' as OrderType,
  orderBy: 'rating'
});

const articles = articlesStore.getArticlesState;

const getArticles = async () => {
  const { data } = await articlesStore.getArticles({
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

watchEffect(async () => {
  await getArticles();
});
</script>

<template>
  <div class="flex flex-wrap justify-between gap-8 my-4">
    <ArticleItem :articles="articles" />
  </div>
</template>
