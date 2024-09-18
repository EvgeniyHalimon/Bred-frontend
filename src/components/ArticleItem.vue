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
    class="relative w-1/2 mx-auto overflow-hidden transition-all border-2 cursor-pointer bg-neutral-900 border-lime-600 hover:border-transparent duration-400 article-clip-path"
    v-for="article in articles"
    :key="article.id"
    @click="() => router.push(`articles/${article.id}`)"
  >
    <div class="flex items-center p-6 bg-gray-900 border-b-2 border-lime-600">
      <img
        :src="article.author.photo"
        :alt="`${article.author.firstName} ${article.author.lastName}-avatar`"
        class="object-cover w-12 h-12 rounded-full"
      />
      <div class="ml-4">
        <h2 class="font-mono text-xl font-semibold text-lime-600">
          {{ article.author.firstName }} {{ article.author.lastName }}
        </h2>
        <p class="font-mono text-sm text-lime-600">{{ formatDate(article.createdAt) }}</p>
      </div>
    </div>
    <div class="p-6">
      <h1 class="mb-4 font-mono text-3xl font-bold text-lime-600">{{ article.title }}</h1>
      <p class="mb-6 font-mono leading-relaxed text-lime-600">{{ article.text }}</p>
      <div class="flex items-center justify-between">
        <p class="font-mono text-sm text-lime-600">{{ article.reactions.length }} reactions</p>
        <p class="font-mono text-sm text-lime-600">{{ article.comments.length }} comments</p>
      </div>
    </div>
  </article>
</template>
