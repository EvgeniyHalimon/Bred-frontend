<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div>
      <nav class="flex justify-between">
        <div>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/articles">Articles</RouterLink>
        </div>
        <RouterLink to="/auth">Auth</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
