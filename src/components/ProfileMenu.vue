<script setup lang="ts">
import { useUserStore } from '@/store';
import { getInitials } from '@/shared/utils';

const userStore = useUserStore();
const user = userStore.getUser;
</script>

<template>
  <img
    v-if="user.photo"
    :src="user.photo"
    :alt="`${user.firstName} ${user.lastName}-avatar`"
    class="object-cover w-12 h-12 rounded-full"
  />
  <div v-else class="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800">
    <span class="font-mono text-xl text-lime-600">
      {{ getInitials(user.firstName, user.lastName) }}
    </span>
  </div>
  <!-- <div class="p-6">
      <h2 class="font-mono text-3xl font-bold text-lime-600">
        {{ user.firstName }} {{ user.lastName }}
      </h2>
    </div> -->
</template>
