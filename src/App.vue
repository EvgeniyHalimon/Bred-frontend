<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationComponent from './components/NavigationComponent.vue';
</script>

<template>
  <NavigationComponent />

  <main class="container p-6 mx-auto">
    <RouterView />
  </main>
</template>

<style scoped></style>
