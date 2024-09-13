<script setup lang="ts">
import { useRouter } from 'vue-router';
import { TheWelcome } from '../components';
import { onMounted } from 'vue';
import { getAccessToken } from '@/shared/tokenWorkshop';
const router = useRouter();
console.log('🚀 ~ file: HomeView.vue:5 ~ router:', router);

onMounted(() => {
  if (!getAccessToken()) {
    router.push('/auth');
  }
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
