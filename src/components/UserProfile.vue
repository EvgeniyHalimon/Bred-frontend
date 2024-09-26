<script setup lang="ts">
import { useUserStore } from '@/store';
import { getInitials } from '@/shared/utils';
import { ref, toRefs } from 'vue';
import { ModalWrapper } from '.';
import UpdateUserForm from './forms/UpdateUserFrom/UpdateUserForm.vue';

const userStore = useUserStore();

const { user } = toRefs(userStore);
const userId = userStore.userId;

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<template>
  <div v-if="user" class="max-w-sm mx-auto overflow-hidden border-2 border-lime-600 bg-neutral-900">
    <div class="relative">
      <img
        v-if="user.photo"
        :src="user.photo"
        :alt="`${user.firstName}-avatar`"
        class="object-cover w-full h-48"
      />
      <div v-else class="flex items-center justify-center w-full h-48 bg-neutral-800">
        <span class="font-mono text-4xl text-lime-600">
          {{ getInitials(user.firstName, user.lastName) }}
        </span>
      </div>
    </div>
    <div class="p-6">
      <h2 class="font-mono text-3xl font-bold text-lime-600">
        {{ user.firstName }} {{ user.lastName }}
      </h2>
      <p class="mt-4 font-mono text-lg font-semibold leading-relaxed text-lime-600">Bio:</p>
      <p class="mt-4 font-mono leading-relaxed whitespace-pre-wrap text-wrap text-lime-600">
        {{ user.bio }}
      </p>
      <!-- BUG -->
      <div v-if="user.id === userId" class="flex items-center justify-between mt-6">
        <button
          @click="openModal"
          class="px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
        >
          Edit Profile
        </button>
      </div>

      <ModalWrapper :isOpen="isModalOpen" @close="closeModal" title="Edit Profile">
        <UpdateUserForm />
      </ModalWrapper>
    </div>
  </div>
</template>
