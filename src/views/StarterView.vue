<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js';
import { onMounted, onUnmounted, ref } from 'vue';

const text =
  ' - is a disorder of mental activity or something meaningless, incoherent, illogical. Make your own Bred.';
const linkText = 'Get in!';
const linkUrl = '/auth';
const typingElement = ref<HTMLDivElement | null>(null);

let index = 0;
let timeoutId: number | null = null;

const type = () => {
  if (index < text.length && typingElement.value) {
    if (typingElement.value.innerHTML.length === 0) {
      typingElement.value.innerHTML = '<span class="italic">Bred</span>';
    }
    typingElement.value.innerHTML += text.charAt(index);

    index++;
    timeoutId = window.setTimeout(type, 100);
  } else if (index === text.length) {
    if (typingElement.value) {
      typingElement.value.innerHTML += ` <a href="${linkUrl}" class="underline text-lime-600">${linkText}</a>`;
      typingElement.value.classList.add('finished');
    }
  }
};

onMounted(type);

onUnmounted(() => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
});
</script>

<template>
  <div class="flex justify-center mb-6 text-lime-600">
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-b-box-outline" class="absolute fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-b-box" class="absolute fade-icon w-60 h-60" />
    </div>
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-r-box" class="absolute fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-r-box-outline" class="absolute fade-icon w-60 h-60" />
    </div>
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-e-box-outline" class="absolute fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-e-box" class="absolute fade-icon w-60 h-60" />
    </div>
    <div class="relative w-60 h-60">
      <Icon icon="mdi:alpha-d-box" class="absolute fade-icon w-60 h-60" />
      <Icon icon="mdi:alpha-d-box-outline" class="absolute fade-icon w-60 h-60" />
    </div>
  </div>
  <div class="flex justify-center">
    <p ref="typingElement" class="typing"></p>
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

.typing {
  font-family: monospace;
  white-space: nowrap;
  display: inline-block;
  border-right: 8px solid;
  animation:
    typing 4s steps(30) forwards,
    blink-caret 0.75s step-end infinite;
  color: #65a30d;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: auto;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #65a30d;
  }
}

.typing.finished {
  border-right: none;
}
</style>
