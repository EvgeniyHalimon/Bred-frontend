<script setup lang="ts">
import { useUserStore } from '@/store';

const userStore = useUserStore();
const user = userStore.getUser;
console.log('🚀 ~ file: HomeView.vue:7 ~ user:', user);
</script>

<template>
  <div
    class="max-w-sm mx-auto overflow-hidden border border-gray-200 shadow-lg bg-gray-50 rounded-xl"
  >
    <div class="relative">
      <img
        :src="user.photo"
        :alt="`${user.firstName}-avatar`"
        class="object-cover w-full h-48 rounded-t-xl"
      />
    </div>
    <div class="p-6">
      <h2 class="text-3xl font-bold text-gray-900">{{ user.firstName }} {{ user.lastName }}</h2>
      <p class="mt-4 leading-relaxed text-gray-700">Bio: {{ user.bio }}</p>
      <div class="flex items-center justify-between mt-6">
        <button
          class="px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg shadow hover:bg-blue-500"
        >
          Edit Profile
        </button>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div class="mx-auto overflow-hidden bg-white rounded-lg shadow-lg max-w-60">
    <img :src="user.photo" :alt="`${user.firstName}-avatar`" class="object-cover w-full h-40" />
    <div class="p-6">
      <h2 class="text-2xl font-semibold text-gray-800">{{ user.firstName }} {{ user.lastName }}</h2>
    </div>
  </div>
</template> -->
