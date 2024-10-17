<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationComponent from './components/NavigationComponent.vue';
</script>

<template>
  <header class="sticky top-0 z-50 p-4 border-b-2 bg-neutral-900 border-lime-600">
    <NavigationComponent />
  </header>

  <main class="container p-6 mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
