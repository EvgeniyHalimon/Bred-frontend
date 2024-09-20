<script setup lang="ts">
import { toRef } from 'vue';
import { useField, ErrorMessage } from 'vee-validate';

const props = defineProps({
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

const { value } = useField(toRef(props, 'name'), {
  validateOnValueUpdate: false
});
</script>

<template>
  <div class="mb-8">
    <label :for="name" class="block mb-1 font-mono text-sm font-medium capitalize text-lime-600">{{
      name
    }}</label>
    <input
      :name="name"
      :type="type"
      v-model="value"
      class="block w-full h-10 px-3 py-2 font-mono border border-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-500"
      :placeholder="placeholder"
    />
    <ErrorMessage :name="name" class="absolute mt-1 font-mono text-sm text-red-600" />
  </div>
</template>
