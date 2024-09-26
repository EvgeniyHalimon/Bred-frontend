<script setup lang="ts">
import type { IArticleWithInfo } from '@/shared/types';
import { getInitials, formatDate } from '@/shared/utils';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

defineProps({
  articles: {
    type: Array as PropType<IArticleWithInfo[]>,
    required: true
  }
});

const router = useRouter();
</script>

<template>
  <article
    class="relative w-[48%] h-72 overflow-hidden transition-all border-2 cursor-pointer bg-neutral-800 border-lime-600 hover:border-black duration-400 article-clip-path"
    v-for="article in articles"
    :key="article.id"
    @click="() => router.push({ name: 'article', params: { id: article.id } })"
  >
    <div class="flex items-center p-6 border-b-2 bg-neutral-900 border-lime-600">
      <img
        v-if="article.author.photo"
        :src="article.author.photo"
        :alt="`${article.author.firstName} ${article.author.lastName}-avatar`"
        class="object-cover w-12 h-12 rounded-full"
      />
      <div v-else class="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800">
        <span class="font-mono text-xl text-lime-600">
          {{ getInitials(article.author.firstName, article.author.lastName) }}
        </span>
      </div>
      <div class="ml-4">
        <h2 class="font-mono text-xl font-semibold text-lime-600">
          {{ article.author.firstName }} {{ article.author.lastName }}
        </h2>
        <p class="font-mono text-sm text-lime-600">{{ formatDate(article.createdAt) }}</p>
      </div>
    </div>
    <div class="p-6">
      <h1 class="mb-4 font-mono text-3xl font-bold text-lime-600">{{ article.title }}</h1>
      <p
        class="mb-6 overflow-hidden font-mono leading-relaxed h-7 text-lime-600 max-h-24 text-ellipsis"
      >
        {{ article.text }}
      </p>

      <div class="flex items-center justify-between">
        <p class="font-mono text-sm text-lime-600">{{ article.reactions.length }} reactions</p>
        <p class="font-mono text-sm text-lime-600">{{ article.comments.length }} comments</p>
      </div>
    </div>
  </article>
</template>
