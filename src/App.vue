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
  <header class="sticky top-0 z-50 p-4 border-b-2 bg-slate-900 border-lime-600">
    <nav class="flex items-center justify-between">
      <div class="font-mono text-2xl font-bold text-lime-600">Bred</div>
      <ul class="flex gap-8">
        <li>
          <RouterLink
            to="/"
            class="font-mono text-lg font-semibold transition-all duration-300 duration-400 text-lime-600 hover:text-lime-600"
            active-class="border-b-2 border-lime-600 hover:text-lime-700"
          >
            Home
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/articles"
            class="font-mono text-lg font-semibold transition-all duration-300 duration-400 text-lime-600 hover:text-lime-700"
            active-class="border-b-2 border-lime-600 hover:text-lime-700"
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
