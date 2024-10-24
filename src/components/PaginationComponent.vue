<script setup lang="ts">
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

const emit = defineEmits(['prevPage', 'nextPage', 'changePage']);
</script>

<template>
  <nav
    aria-label="Pagination"
    class="flex justify-center -space-x-px bg-black rounded-md shadow-sm text-lime-500"
  >
    <button
      type="button"
      :disabled="props.page === 1"
      @click="() => $emit('prevPage')"
      :class="[
        'transition-all duration-500 inline-flex items-center px-2 py-2 text-sm font-semibold border cursor-pointer rounded-l-md border-lime-500',

        props.page === 1 ? 'opacity-50 ' : 'hover:bg-lime-500 hover:text-black '
      ]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <button
      v-for="pageNum in count"
      :key="pageNum"
      type="button"
      :aria-current="page === pageNum ? 'page' : undefined"
      @click="$emit('changePage', pageNum)"
      :class="[
        'inline-flex items-center px-4 py-2 text-sm font-semibold text-black transition-all duration-500 border border-lime-500',
        page === pageNum ? 'bg-lime-500' : 'bg-lime-700',
        'hover:bg-lime-500'
      ]"
    >
      {{ pageNum }}
    </button>

    <button
      type="button"
      class="inline-flex items-center px-4 py-2 text-sm font-semibold border border-lime-500"
    >
      ...
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        class="w-5 h-5"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
  </nav>
</template>
