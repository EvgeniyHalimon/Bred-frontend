<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import ProfileMenu from './ProfileMenu.vue';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.accessTokenFromLocalStorage) {
    router.push('/auth');
  }
});
</script>

<template>
  <nav class="flex items-center justify-between">
    <div>
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
    </div>
    <ProfileMenu v-if="route.path !== '/auth' && authStore.accessTokenFromLocalStorage" />
  </nav>
</template>

<style scoped></style>
