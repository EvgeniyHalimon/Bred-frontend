<script setup lang="ts">
import type { IArticles } from '@/shared/types';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  articles: {
    type: Array as PropType<IArticles[]>,
    required: true
  }
});

const router = useRouter();

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
  <article
    class="w-1/2 mx-auto overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md"
    v-for="article in articles"
    :key="article.id"
    @click="() => router.push(`articles/${article.id}`)"
  >
    <div class="flex items-center p-6 bg-gray-100 border-b border-gray-200">
      <img
        :src="article.author.photo"
        :alt="`${article.author.firstName} ${article.author.lastName}-avatar`"
        class="object-cover w-12 h-12 rounded-full"
      />
      <div class="ml-4">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ article.author.firstName }} {{ article.author.lastName }}
        </h2>
        <p class="text-sm text-gray-500">{{ formatDate(article.createdAt) }}</p>
      </div>
    </div>
    <div class="p-6">
      <h1 class="mb-4 text-3xl font-bold text-gray-900">{{ article.title }}</h1>
      <p class="mb-6 leading-relaxed text-gray-700">{{ article.text }}</p>
      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-500">{{ article.reactions.length }} reactions</p>
        <p class="text-sm text-gray-500">{{ article.comments.length }} comments</p>
      </div>
    </div>
  </article>
</template>
