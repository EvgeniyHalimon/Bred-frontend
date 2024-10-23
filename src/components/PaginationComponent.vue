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
      :disabled="page === 1 ? true : false"
      @click="$emit('prevPage')"
      class="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md border-lime-500"
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
      type="button"
      aria-current="page"
      @click="$emit('changePage', 1)"
      class="inline-flex items-center px-4 py-2 text-sm font-semibold text-black border bg-lime-700 border-lime-500"
    >
      1
    </button>

    <button
      type="button"
      class="inline-flex items-center px-4 py-2 text-sm font-semibold border border-lime-500"
    >
      ...
    </button>

    <button
      type="button"
      :disabled="page === 1 ? true : false"
      @click="$emit('nextPage')"
      class="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md border-lime-500"
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
