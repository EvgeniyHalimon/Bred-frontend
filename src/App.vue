<script setup lang="ts">
import { RouterView, useRoute, useRouter } from 'vue-router';
import NavigationComponent from './components/NavigationComponent.vue';
import { onMounted, toRefs } from 'vue';
import { useAuthStore } from '@/store';
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const { accessToken } = toRefs(authStore);
onMounted(() => {
  if (!accessToken.value && route.name !== 'confirm') {
    router.push('/auth');
  }
});
</script>

<template>
  <NavigationComponent />

  <main class="container p-6 mx-auto">
    <RouterView />
  </main>
</template>

<style scoped>
input[type='checkbox'] {
  appearance: none;
  width: 14px;
  height: 14px;
  outline: 1px solid #65a30d;
  border-radius: 4px;
  background-color: black;
  position: relative;
  cursor: pointer;
}

input[type='checkbox']:checked {
  background-color: #65a30d;
}

input[type='checkbox']:checked::after {
  content: '✔';
  position: absolute;
  top: -2px;
  left: 2px;
  color: black;
  font-size: 14px;
  font-weight: bold;
}
</style>
