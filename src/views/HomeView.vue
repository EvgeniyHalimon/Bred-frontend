<script setup lang="ts">
import { useUserStore } from '@/store';
import { UserComponent } from '../components';

const userStore = useUserStore();
const user = userStore.getUser;
console.log('🚀 ~ file: HomeView.vue:7 ~ user:', user);
</script>

<template>
  <main>
    <UserComponent :user="user" />
  </main>
</template>
