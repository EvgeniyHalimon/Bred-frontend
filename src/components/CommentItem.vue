<script setup lang="ts">
import type { ICommentWithAuthor } from '@/shared/types';
import { formatDate, getInitials } from '@/shared/utils';
import { defineProps, ref } from 'vue';
import type { PropType } from 'vue';
import { CommentsIcons, UpdateCommentForm } from '.';
import { useUserStore } from '@/store';

defineProps({
  comment: {
    type: Object as PropType<ICommentWithAuthor>,
    required: true
  }
});

const userStore = useUserStore();

const isEdit = ref(false);
</script>

<template>
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
    <div class="flex-1 overflow-hidden">
      <div class="flex justify-between w-full">
        <div>
          <h2 class="font-mono text-sm font-bold text-lime-600">
            {{ comment.author.firstName }} {{ comment.author.lastName }}
          </h2>
          <p class="mb-2 font-mono text-xs text-lime-600">{{ formatDate(comment.createdAt) }}</p>
        </div>
        <CommentsIcons
          v-model:is-edit="isEdit"
          :comment-id="comment.id"
          v-if="userStore.userId === comment.authorId"
        />
      </div>

      <UpdateCommentForm :comment="comment" v-model:is-edit="isEdit">
        <p
          class="max-w-full overflow-hidden font-mono text-sm font-bold break-words whitespace-pre-wrap text-lime-600 word-break"
          v-if="!isEdit"
        >
          {{ comment.text }}
        </p>
      </UpdateCommentForm>
    </div>
  </div>
</template>
