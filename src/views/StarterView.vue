<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
</script>

<template>
  <div class="flex justify-center text-lime-600">
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-b-box-outline" class="absolute text-3xl fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-b-box" class="absolute text-3xl fade-icon w-60 h-60" />
    </div>
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-r-box" class="absolute text-3xl fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-r-box-outline" class="absolute text-3xl fade-icon w-60 h-60" />
    </div>
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-e-box-outline" class="absolute text-3xl fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-e-box" class="absolute text-3xl fade-icon w-60 h-60" />
    </div>
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-d-box" class="absolute text-3xl fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-d-box-outline" class="absolute text-3xl fade-icon w-60 h-60" />
    </div>
  </div>
</template>

<style scoped>
@keyframes fade {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

.fade-icon {
  animation: fade 2s infinite ease-in-out;
}

.fade-icon:nth-child(2n) {
  animation-delay: 1s;
}
</style>
