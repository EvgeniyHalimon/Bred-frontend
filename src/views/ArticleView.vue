<script setup lang="ts">
import { useArticleStore } from '@/store';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getInitials, formatDate } from '@/shared/utils';
const route = useRoute();
const articleId = ref(route.params.id as string);

const articleStore = useArticleStore();
const article = articleStore.getArticleState;
const getArticle = async () => {
  const { data } = await articleStore.getArticle(articleId.value);
  if (data) {
    articleStore.setArticle(data);
  }
};

watchEffect(async () => await getArticle());
</script>

<template>
  <div class="flex gap-8">
    <img
      v-if="article.author.photo"
      :src="article.author.photo"
      :alt="`${article.author.firstName} ${article.author.lastName}-avatar`"
      class="object-cover w-24 h-24 rounded-full"
    />
    <div v-else class="flex items-center justify-center w-24 h-24 rounded-full bg-neutral-800">
      <span class="font-mono text-2xl font-bold text-lime-600">
        {{ getInitials(article.author.firstName, article.author.lastName) }}
      </span>
    </div>
    <div>
      <h2 class="font-mono text-2xl font-semibold text-lime-600">
        {{ article.author.firstName }} {{ article.author.lastName }}
      </h2>
      <p class="font-mono text-lg text-lime-600">{{ formatDate(article.createdAt) }}</p>
    </div>
  </div>
  <div class="py-6">
    <h1 class="mb-4 font-mono text-5xl font-bold text-lime-600">{{ article.title }}</h1>
    <p class="mb-6 font-mono text-xl leading-relaxed text-lime-600">{{ article.text }}</p>
  </div>
</template>
