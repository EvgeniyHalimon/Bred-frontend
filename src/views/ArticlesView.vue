<script setup lang="ts">
import { useArticleStore } from '../store';

const articlesStore = useArticleStore();
console.log('🚀 ~ file: ArticlesView.vue:6 ~ articlesStore:', articlesStore.$state.articles[0]);
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
