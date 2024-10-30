<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { ErrorMessage, useField, useForm } from 'vee-validate';
import CreateCommentSchema from './CreateCommentSchema';
import { useCommentsStore } from '@/store';
import { tryCatchWrapper } from '@/shared';

const isHovered = ref(false);

const route = useRoute();

const commentsStore = useCommentsStore();

const { handleSubmit } = useForm({
  validationSchema: CreateCommentSchema,
  initialValues: {
    text: ''
  }
});

const { value: text } = useField<string>('text');

const onSubmit = handleSubmit(async (values: { text: string }) => {
  await tryCatchWrapper(async () => {
    const result = await commentsStore.createComment({
      ...values,
      articleId: route.params.id as string
    });
    text.value = '';
    if (result) {
      commentsStore.updateComments(result.data);
    }
  });
});
</script>

<template>
  <form @submit.prevent="onSubmit" :validation-schema="CreateCommentSchema" class="relative">
    <label for="text" class="block mb-1 font-mono text-sm font-medium capitalize text-lime-600">
      What's your opinion?
    </label>
    <textarea
      id="text"
      name="text"
      placeholder="What's on your mind?"
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
        :width="20"
        class="transition-all duration-500 cursor-pointer text-lime-600 hover:text-lime-500"
      />
    </button>
    <ErrorMessage name="text" class="absolute mt-1 font-mono text-sm text-red-600" />
  </form>
</template>
