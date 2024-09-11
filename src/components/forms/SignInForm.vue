<script setup lang="ts">
import { ref } from 'vue';

const inputType = ref('password');
</script>

<template>
  <form>
    <input type="text" />
    <input type="password" />
  </form>
</template>
