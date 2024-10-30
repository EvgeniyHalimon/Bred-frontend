<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import ProfileMenu from './ProfileMenu.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

const route = useRoute();
const authStore = useAuthStore();
</script>

<template>
  <header
    class="sticky top-0 z-50 p-4 border-b-2 bg-neutral-900 border-lime-600"
    v-if="route.path !== '/'"
  >
    <nav class="flex items-center justify-between">
      <div>
        <div class="flex text-lime-600" v-if="route.path !== '/'">
          <Icon icon="mdi:alpha-b-box-outline" class="text-3xl" />
          <Icon icon="mdi:alpha-r-box" class="text-3xl" />
          <Icon icon="mdi:alpha-e-box-outline" class="text-3xl" />
          <Icon icon="mdi:alpha-d-box" class="text-3xl" />
        </div>
        <ul
          class="flex gap-8"
          v-if="route.path !== '/auth' && authStore.accessToken && route.name !== 'confirm'"
        >
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
      </div>
      <ProfileMenu
        v-if="route.path !== '/auth' && authStore.accessToken && route.name !== 'confirm'"
      />
    </nav>
  </header>
</template>
