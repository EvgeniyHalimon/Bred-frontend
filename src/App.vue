<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { getAccessToken } from './shared/tokenWorkshop';
const isLoggedIn = ref(getAccessToken());
console.log('🚀 ~ file: App.vue:6 ~ isLoggedIn:', isLoggedIn.value);
</script>

<template>
  <header>
    <div>
      <nav class="flex justify-between">
        <div>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/articles">Articles</RouterLink>
        </div>
        <RouterLink to="/auth" v-if="!isLoggedIn">Auth</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
