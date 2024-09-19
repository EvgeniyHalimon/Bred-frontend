<script setup lang="ts">
import { useUserStore } from '@/store';
import { getInitials } from '@/shared/utils';

const userStore = useUserStore();
const user = userStore.getUser;
</script>

<template>
  <div class="max-w-sm mx-auto overflow-hidden border-2 border-lime-600 bg-neutral-900">
    <div class="relative">
      <img
        v-if="user.photo"
        :src="user.photo"
        :alt="`${user.firstName}-avatar`"
        class="object-cover w-full h-48"
      />
      <div v-else class="flex items-center justify-center w-full h-48 bg-neutral-800">
        <span class="font-mono text-4xl text-lime-600">
          {{ getInitials(user.firstName, user.lastName) }}
        </span>
      </div>
    </div>
    <div class="p-6">
      <h2 class="font-mono text-3xl font-bold text-lime-600">
        {{ user.firstName }} {{ user.lastName }}
      </h2>
      <p class="mt-4 font-mono leading-relaxed text-lime-600">Bio: {{ user.bio }}</p>
      <div class="flex items-center justify-between mt-6">
        <button
          class="px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
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
