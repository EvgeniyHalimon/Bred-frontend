<script setup lang="ts">
import { defineProps, ref, type PropType } from 'vue';
import { Icon } from '@iconify/vue';
import { ErrorMessage, useField, useForm } from 'vee-validate';
import { useCommentsStore } from '@/store';
import CreateCommentSchema from '../CommentForm/CreateCommentSchema';
import { tryCatchWrapper, type ICommentWithAuthor } from '@/shared';

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

const { handleSubmit } = useForm({
  validationSchema: CreateCommentSchema,
  initialValues: {
    text: props.comment.text
  }
});

const { value: text } = useField<string>('text');

const emit = defineEmits<{ 'update:isEdit': [boolean] }>();

const onEscape = () => {
  emit('update:isEdit', false);
  text.value = props.comment.text;
};

const onSubmit = handleSubmit(async (values: { text: string }) => {
  tryCatchWrapper(async () => {
    const result = await commentsStore.patchComment(values, props.comment.id);
    onEscape();
    if (result) {
      commentsStore.updateCommentsFromStore(result.data);
    }
  });
});
</script>

<template>
  <form v-if="isEdit" @submit="onSubmit" class="relative">
    <textarea
      id="text"
      name="text"
      v-model="text"
      class="block w-full h-20 px-3 py-2 font-mono bg-black border outline-none resize-none text-lime-500 border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
      @keydown.esc="onEscape"
    ></textarea>
    <button
      type="submit"
      class="absolute right-4 bottom-2"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <Icon
        :icon="isHovered ? 'mdi:send-variant' : 'mdi:send-variant-outline'"
        class="transition-all duration-500 cursor-pointer text-lime-600 hover:text-lime-500"
        :width="20"
      />
    </button>
    <ErrorMessage name="text" class="absolute mt-1 font-mono text-sm text-red-600" />
  </form>
  <slot v-else></slot>
</template>
