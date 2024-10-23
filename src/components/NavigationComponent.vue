<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';
import ProfileMenu from './ProfileMenu.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

/* onMounted(() => {
  if (!authStore.accessToken) {
    router.push('/auth');
  }
}); */
</script>

<template>
  <nav class="flex items-center justify-between">
    <div>
      <div class="flex text-lime-600" v-if="route.path !== '/auth' && authStore.accessToken">
        <Icon icon="mdi:alpha-b-box-outline" class="text-3xl" />
        <Icon icon="mdi:alpha-r-box" class="text-3xl" />
        <Icon icon="mdi:alpha-e-box-outline" class="text-3xl" />
        <Icon icon="mdi:alpha-d-box" class="text-3xl" />
      </div>
      <ul class="flex gap-8" v-if="route.path !== '/auth' && authStore.accessToken">
        <li>
          <RouterLink
            to="/home"
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
      <RouterLink
        to="/"
        class="font-mono text-lg font-semibold transition-all duration-300 duration-400 text-lime-600 hover:text-lime-600"
        v-if="route.path === '/' && !authStore.accessToken"
      >
        Get in!
      </RouterLink>
    </div>
    <ProfileMenu v-if="route.path !== '/auth' && authStore.accessToken" />
  </nav>
</template>
