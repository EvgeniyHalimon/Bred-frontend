<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getInitials, formatDate } from '@/shared/utils';
import { CommentForm, CommentsComponent } from '@/components';
import { Icon } from '@iconify/vue';
import { ReactionTypeEnum } from '@/shared/types';
import { useArticleInteractions } from '@/composables';
const route = useRoute();
const articleId = ref(route.params.id as string);

const { article, comments, isUpvoted, isDownvoted, getArticle, handleVote } =
  useArticleInteractions(articleId.value);

watchEffect(getArticle);
</script>

<template>
  <div v-if="article">
    <div class="flex justify-between gap-8 mb-5">
      <div>
        <img
          v-if="article.author.photo"
          :src="article.author.photo"
          :alt="`${article.author.firstName}-${article.author.lastName}-avatar`"
          class="object-cover w-24 h-24 mb-2 rounded-full"
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

      <div class="flex gap-2">
        <button @click="() => handleVote(ReactionTypeEnum.UPVOTE)">
          <Icon
            :icon="isUpvoted ? 'mdi:chevron-up-box' : 'mdi:chevron-up-box-outline'"
            :width="30"
            class="transition-all duration-500 cursor-pointer text-lime-600 hover:text-lime-500"
          />
        </button>

        <button @click="() => handleVote(ReactionTypeEnum.DOWNVOTE)">
          <Icon
            :icon="isDownvoted ? 'mdi:chevron-up-box' : 'mdi:chevron-up-box-outline'"
            :rotate="90"
            :width="30"
            class="transition-all duration-500 cursor-pointer text-lime-600 hover:text-lime-500"
          />
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-2 mb-5">
      <h1 class="font-mono text-5xl font-bold text-lime-600">{{ article.title }}</h1>
      <p
        class="pb-6 font-mono text-xl leading-relaxed whitespace-pre-wrap border-b text-lime-600 border-lime-400"
      >
        {{ article.text }}
      </p>
    </div>
    <CommentsComponent :comments="comments" />
    <CommentForm />
  </div>
</template>
