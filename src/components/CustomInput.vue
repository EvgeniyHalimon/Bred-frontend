<script setup lang="ts">
import { ErrorMessage } from 'vee-validate';
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="mb-8">
    <label :for="name" class="block mb-1 font-mono text-sm font-medium capitalize text-lime-600">
      {{ name }}
    </label>

    <input
      v-if="name !== 'bio'"
      :id="name"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="block w-full h-10 px-3 py-2 font-mono border border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
    />
    <textarea
      v-else
      :id="name"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="block w-full h-10 px-3 py-2 font-mono border border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
    ></textarea>

    <ErrorMessage :name="name" class="absolute mt-1 font-mono text-sm text-red-600" />
  </div>
</template>
