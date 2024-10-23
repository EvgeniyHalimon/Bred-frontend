<script setup lang="ts">
import type { OrderType } from '@/shared/types';
import { useArticleStore, useUserStore } from '@/store';
import { reactive, ref, toRefs, watch, watchEffect } from 'vue';
import { ArticleItem, PaginationComponent } from '.';

const articlesStore = useArticleStore();
const userStore = useUserStore();
const authorId = userStore.userId;

const page = ref(1);
const limit = ref(10);

const articleParams = reactive({
  page: page.value,
  limit: limit.value,
  order: 'ASC' as OrderType,
  orderBy: 'rating'
});

const { articles } = toRefs(articlesStore);

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

const nextPage = () => {
  articleParams.page = articleParams.page + 1;
};

const prevPage = () => {
  articleParams.page = articleParams.page - 1;
};

const changeOrder = (newOrder: OrderType) => {
  articleParams.order = newOrder;
};

watchEffect(() => {
  getArticles();
});

const { user } = toRefs(userStore);

watch(
  user,
  () => {
    getArticles();
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-wrap justify-between gap-8 my-4">
    <ArticleItem :articles="articles" />
  </div>
  <PaginationComponent
    :page="page"
    :count="1"
    v-on:next-page="nextPage"
    v-on:prev-page="prevPage"
    v-on:change-page="changePage"
  />
</template>
