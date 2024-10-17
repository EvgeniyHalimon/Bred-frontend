<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, useUserStore } from '@/store';
import { getInitials } from '@/shared/utils';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const { user } = toRefs(userStore);

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goToProfile = () => {
  router.push('/');
};

const logout = () => {
  authStore.logout();
  router.push('/auth');
};
</script>

<template>
  <div v-if="user" class="relative" @click="toggleMenu">
    <div class="cursor-pointer">
      <img
        v-if="user.photo"
        :src="user.photo"
        :alt="`${user.firstName}-${user.lastName}-avatar`"
        class="object-cover w-12 h-12 rounded-full"
      />
      <div v-else class="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-800">
        <span class="font-mono text-xl text-lime-600">
          {{ getInitials(user.firstName, user.lastName) }}
        </span>
      </div>
    </div>
    <ul
      v-if="isMenuOpen"
      class="absolute right-0 w-40 p-2 mt-2 font-mono text-sm bg-black border-2 rounded-md border-lime-600"
    >
      <li
        @click="goToProfile"
        class="p-2 mb-1 transition-all cursor-pointer text-lime-600 hover:bg-lime-600 hover:text-black"
        data-text="Profile"
      >
        Profile
      </li>
      <li
        @click="logout"
        class="p-2 transition-all cursor-pointer text-lime-600 hover:bg-lime-600 hover:text-black"
        data-text="Logout"
      >
        Logout
      </li>
    </ul>
  </div>
</template>
