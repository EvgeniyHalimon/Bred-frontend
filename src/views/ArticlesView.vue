<script setup lang="ts">
import { useArticleStore } from '../store';

const articlesStore = useArticleStore();
</script>

<template>
  <div class="flex flex-col gap-1">
    <h1>This is an about page</h1>
    <div
      v-for="article of articlesStore.articles"
      v-bind:key="article.id"
      class="border rounded-md bg-slate-300"
    >
      <p>{{ article.title }}</p>
      <p>{{ article.text }}</p>
    </div>
  </div>
</template>
