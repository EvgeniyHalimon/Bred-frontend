<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const emit = defineEmits<{ close: [] }>();

const closeModal = () => {
  emit('close');
};

const { isOpen, title } = toRefs(props);
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
    @click="closeModal"
  >
    <div class="w-full max-w-lg bg-neutral-900" @click.stop>
      <div class="relative flex items-center justify-center p-4 border-b border-lime-600">
        <h3 class="font-mono text-lg font-semibold text-lime-500">{{ title }}</h3>
        <button
          @click="closeModal"
          class="absolute font-mono text-base text-lime-500 top-1 right-2 hover:text-lime-600"
        >
          &#x2715;
        </button>
      </div>
      <div class="p-4 text-lime-500">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
