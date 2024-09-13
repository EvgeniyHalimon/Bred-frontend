<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';

import { onMounted } from 'vue';
import { useAuthStore } from '@/store';
const router = useRouter();
const authStore = useAuthStore();
onMounted(() => {
  if (!authStore.accessTokenFromLocalStorage) {
    router.push('/auth');
  }
});
</script>

<template>
  <header>
    <div>
      <nav class="flex gap-4">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/articles">Articles</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
