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
  <div class="mb-4">
    <label :for="name" class="block mb-2 text-sm font-medium text-gray-700 capitalize">{{
      name
    }}</label>
    <input
      :name="name"
      :type="type"
      v-model="value"
      class="block w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      :placeholder="placeholder"
    />
    <ErrorMessage :name="name" class="mt-1 text-sm text-red-600" />
  </div>
</template>
