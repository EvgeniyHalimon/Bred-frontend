<script setup lang="ts">
import type { OrderType } from '@/shared/types';
import { useArticleStore } from '@/store';
import { reactive, ref, toRefs, watchEffect } from 'vue';
import { ArticleItem, PaginationComponent } from '@/components';

const articlesStore = useArticleStore();

const count = ref(0);

const articleParams = reactive({
  page: 1,
  limit: 10,
  order: 'ASC' as OrderType,
  orderBy: 'rating'
});

const { articles } = toRefs(articlesStore);

const getArticles = async () => {
  const { data } = await articlesStore.fetchArticles({
    ...articleParams
  });
  if (data.articles) {
    articlesStore.setArticles(data.articles);
    count.value = data.count;
  }
};

const changePage = (newPage: number) => {
  if (articleParams.page === newPage) return;
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
</script>

<template>
  <div class="flex flex-wrap justify-between gap-8 my-4">
    <ArticleItem :articles="articles" />
  </div>
  <PaginationComponent
    :page="articleParams.page"
    :count="Math.ceil(count / articleParams.limit)"
    v-on:next-page="nextPage"
    v-on:prev-page="prevPage"
    v-on:change-page="changePage"
  />
</template>
