<script setup lang="ts">
import type { ICommentWithAuthor } from '@/shared/types';
import { defineProps } from 'vue';
import type { PropType } from 'vue';
import { CommentItem } from '.';

defineProps({
  comments: {
    type: Array as PropType<ICommentWithAuthor[]>,
    required: true
  }
});
</script>

<template>
  <h3 class="mb-2 font-mono text-xl font-semibold text-lime-600">Comments</h3>
  <div v-for="comment in comments" :key="comment.id" class="flex flex-col mb-3">
    <CommentItem :comment="comment" />
  </div>
</template>
