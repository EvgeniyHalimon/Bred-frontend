<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useCommentsStore } from '@/store';

const isEditHovering = ref(false);
const isDeleteHovering = ref(false);

const props = defineProps({
  isEdit: {
    type: Boolean,
    required: true
  },
  commentId: {
    type: String,
    required: true
  }
});

const commentsStore = useCommentsStore();

const emit = defineEmits(['update:isEdit']);

const deleteComment = async () => {
  const { status } = await commentsStore.deleteComment(props.commentId);
  if (status === 200) {
    commentsStore.deleteCommentFromStore(props.commentId);
  }
};
</script>

<template>
  <div class="flex gap-2">
    <button
      @mouseenter="isEditHovering = true"
      @mouseleave="isEditHovering = false"
      class="transition-all duration-500"
      @click="$emit('update:isEdit', isEdit ? false : true)"
    >
      <Icon
        :icon="isEditHovering ? 'mdi:pencil' : 'mdi:pencil-outline'"
        color="#65a30d"
        :width="20"
      />
    </button>

    <button
      @mouseenter="isDeleteHovering = true"
      @mouseleave="isDeleteHovering = false"
      class="transition-all duration-500"
      @click="deleteComment"
    >
      <Icon :icon="isDeleteHovering ? 'mdi:bin' : 'mdi:bin-outline'" color="#65a30d" :width="20" />
    </button>
  </div>
</template>
