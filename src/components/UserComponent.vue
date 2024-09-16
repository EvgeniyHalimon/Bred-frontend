<script setup lang="ts">
import type { IUser } from '@/shared/types';
import { defineProps, type PropType } from 'vue';

const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    required: true
  }
});

console.log(props.user);
</script>

<template>
  <div class="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
    <img
      :src="`data:image/jpeg;base64,${user.photo}`"
      :alt="`${user.firstName}-avatar`"
      class="object-cover w-full h-56"
    />
    <div class="p-6">
      <h2 class="text-2xl font-semibold text-gray-800">{{ user.firstName }} {{ user.lastName }}</h2>
      <p class="text-gray-600">Bio: {{ user.bio }}</p>
    </div>
  </div>
</template>
