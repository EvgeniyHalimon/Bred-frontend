<script setup lang="ts">
import type { ICommentWithAuthor } from '@/shared/types';
import { formatDate, getInitials } from '@/shared/utils';
import { defineProps } from 'vue';
import type { PropType } from 'vue';

defineProps({
  comments: {
    type: Array as PropType<ICommentWithAuthor[]>,
    required: true
  }
});

const like = () => {};

const dislike = () => {};
</script>

<template>
  <h3 class="mb-2 font-mono text-xl font-semibold text-lime-600">Comments</h3>
  <div v-for="comment in comments" :key="comment.id" class="flex flex-col mb-3">
    <div class="flex gap-8 mb-3">
      <img
        v-if="comment.author.photo"
        :src="comment.author.photo"
        :alt="`${comment.author.firstName} ${comment.author.lastName}-avatar`"
        class="object-cover w-12 h-12 rounded-full"
      />
      <div v-else class="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800">
        <span class="font-mono text-sm font-bold text-lime-600">
          {{ getInitials(comment.author.firstName, comment.author.lastName) }}
        </span>
      </div>
      <div>
        <h2 class="font-mono text-sm font-bold text-lime-600">
          {{ comment.author.firstName }} {{ comment.author.lastName }}
        </h2>
        <p class="mb-2 font-mono text-xs text-lime-600">{{ formatDate(comment.createdAt) }}</p>
        <p class="font-mono text-sm font-bold whitespace-pre-wrap text-lime-600">
          {{ comment.text }}
        </p>
        <!-- <Icon
          icon="mdi:thumb-up"
          color="#65a30d"
          v-on:click="
            () => {
              console.log('123');
            }
          "
        />
        <Icon icon="mdi:thumb-up-outline" color="#65a30d" />
        <Icon icon="mdi:thumb-down" color="#65a30d" />
        <Icon icon="mdi:thumb-down-outline" color="#65a30d" /> -->
      </div>
    </div>
  </div>
</template>
