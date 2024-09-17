<script setup lang="ts">
import type { OrderType } from '@/shared/types';
import { useArticleStore, useUserStore } from '@/store';
import { reactive, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { ArticleItem } from '.';

const articlesStore = useArticleStore();
const userStore = useUserStore();
const authorId = userStore.getUserId;

const articleParams = reactive({
  page: 1,
  limit: 10,
  order: 'ASC' as OrderType,
  orderBy: 'rating'
});

const articles = articlesStore.getArticlesState;

const getArticles = async () => {
  const { data } = await articlesStore.getArticles({
    authorId: authorId.value,
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
  <div class="flex flex-col gap-8 my-3">
    <ArticleItem :articles="articles" />
  </div>
</template>
