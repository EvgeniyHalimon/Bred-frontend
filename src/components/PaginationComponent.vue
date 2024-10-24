<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

const relevantPages = ref<number[]>([]);

const getRelevantPages = () => {
  if (props.count <= 3) {
    relevantPages.value = Array.from({ length: props.count }, (_, i) => i + 1);
  } else if (props.page >= props.count - 2) {
    relevantPages.value = [props.count - 2, props.count - 1, props.count];
  } else if (props.page <= 2) {
    relevantPages.value = [1, 2, 3];
  } else {
    relevantPages.value = [props.page - 1, props.page, props.page + 1];
  }
};

onMounted(getRelevantPages);

watch([() => props.page, () => props.count], getRelevantPages);
</script>

<template>
  <nav
    aria-label="Pagination"
    class="flex justify-center -space-x-px bg-black rounded-md shadow-sm text-lime-500"
  >
    <button
      type="button"
      :disabled="props.page === props.count"
      @click="$emit('nextPage')"
      :class="[
        'transition-all duration-500 inline-flex items-center px-2 py-2 text-sm font-semibold border cursor-pointer rounded-l-md border-lime-500',

        props.page === 1 ? 'opacity-50 ' : 'hover:bg-lime-500 hover:text-black '
      ]"
    >
      <Icon icon="mdi:chevron-double-left" />
    </button>
    <button
      type="button"
      :disabled="props.page === 1"
      @click="() => $emit('prevPage')"
      :class="[
        'transition-all duration-500 inline-flex items-center px-2 py-2 text-sm font-semibold border cursor-pointer rounded-l-md border-lime-500',

        props.page === 1 ? 'opacity-50 ' : 'hover:bg-lime-500 hover:text-black '
      ]"
    >
      <Icon icon="mdi:chevron-left" />
    </button>

    <button
      v-for="pageNum in relevantPages"
      :key="pageNum"
      type="button"
      :aria-current="props.page === pageNum ? 'page' : undefined"
      @click="$emit('changePage', pageNum)"
      :class="[
        'inline-flex items-center px-4 py-2 text-sm font-semibold text-black transition-all duration-500 border border-lime-500',
        props.page === pageNum ? 'bg-lime-500' : 'bg-lime-700',
        'hover:bg-lime-500'
      ]"
    >
      {{ pageNum }}
    </button>

    <button
      type="button"
      :disabled="props.page === props.count"
      @click="$emit('nextPage')"
      :class="[
        'transition-all duration-500 inline-flex items-center px-2 py-2 text-sm font-semibold border cursor-pointer rounded-r-md border-lime-500',
        props.page === props.count ? 'opacity-50 ' : 'hover:bg-lime-500 hover:text-black'
      ]"
    >
      <Icon icon="mdi:chevron-right" />
    </button>

    <button
      type="button"
      :disabled="props.page === props.count"
      @click="$emit('nextPage')"
      :class="[
        'transition-all duration-500 inline-flex items-center px-2 py-2 text-sm font-semibold border cursor-pointer rounded-r-md border-lime-500',
        props.page === props.count ? 'opacity-50 ' : 'hover:bg-lime-500 hover:text-black'
      ]"
    >
      <Icon icon="mdi:chevron-double-right" />
    </button>
  </nav>
</template>
