<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.accessTokenFromLocalStorage) {
    router.push('/auth');
  }
});
</script>

<template>
  <header class="p-4 bg-gray-800 shadow-md">
    <nav class="flex items-center justify-between">
      <div class="text-2xl font-bold text-white">Bred</div>
      <ul class="flex gap-8">
        <li>
          <RouterLink
            to="/"
            class="text-lg font-semibold text-white transition duration-300 hover:text-gray-300"
            active-class="border-b-2 border-yellow-500"
          >
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/articles"
            class="text-lg font-semibold text-white transition duration-300 hover:text-gray-300"
            active-class="border-b-2 border-yellow-500"
          >
            Articles
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <main class="container p-6 mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
