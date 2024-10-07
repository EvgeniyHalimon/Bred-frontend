<script setup lang="ts">
import type { ICommentWithAuthor } from '@/shared/types';
import { defineProps, ref } from 'vue';
import type { PropType } from 'vue';
import { useCommentsStore } from '@/store';
import { ErrorMessage, useField, useForm } from 'vee-validate';
import CreateCommentSchema from '../CommentForm/CreateCommentSchema';
import { Icon } from '@iconify/vue';

const props = defineProps({
  comment: {
    type: Object as PropType<ICommentWithAuthor>,
    required: true
  },
  isEdit: {
    type: Boolean,
    required: true
  }
});

const commentsStore = useCommentsStore();

const isHovered = ref(false);

console.log('🚀 ~ file: UpdateCommentForm.vue:29 ~ props:', props.comment.text);
const { handleSubmit } = useForm({
  validationSchema: CreateCommentSchema,
  initialValues: {
    text: props.comment.text
  }
});
const { value: text } = useField<string>('text');

const onSubmit = handleSubmit(async (values: { text: string }) => {
  const result = await commentsStore.patchComment(values, props.comment.id);
  text.value = '';
  if (result) {
    commentsStore.updateCommentFromStore(result.data);
  }
});
</script>

<template>
  <form v-if="isEdit" @submit="onSubmit" class="relative">
    <textarea
      id="text"
      name="text"
      v-model="text"
      class="block w-full h-20 px-3 py-2 font-mono bg-black border resize-none text-lime-500 border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
    ></textarea>
    <button
      type="submit"
      class="absolute right-4 bottom-2"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <Icon
        :icon="isHovered ? 'mdi:send-variant' : 'mdi:send-variant-outline'"
        color="#65a30d"
        :width="20"
      />
    </button>
    <ErrorMessage name="text" class="absolute mt-1 font-mono text-sm text-red-600" />
  </form>
  <slot v-else></slot>
</template>
