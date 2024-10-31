<script setup lang="ts">
import { useAuthStore } from '@/store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { params } = useRoute();

const authStore = useAuthStore();

onMounted(() => {
  authStore.confirm(`${params.token}`);
});
</script>

<template>
  <h1 class="mb-4 font-mono text-3xl font-semibold text-lime-500">Email Verified!</h1>
  <p class="font-mono text-xl text-lime-500">
    Your email address has been successfully verified. Now you can use all the features of our
    service without restrictions.
  </p>
  <p class="flex items-center gap-1 mt-4 font-mono text-lg text-lime-500">
    <RouterLink
      to="/auth"
      class="flex items-center underline transition-colors duration-300 hover:text-lime-700"
    >
      Please login
    </RouterLink>
    , and thank you for choosing Bred!
  </p>
</template>
