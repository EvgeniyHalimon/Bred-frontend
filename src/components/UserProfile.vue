<script setup lang="ts">
import { useArticleStore, useUserStore } from '@/store';
import { getInitials } from '@/shared/utils';
import { ref, toRefs } from 'vue';
import { ModalWrapper, UpdateUserForm } from '.';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const router = useRouter();

const userStore = useUserStore();
const articleStore = useArticleStore();

const { user } = toRefs(userStore);
const userId = userStore.userId;

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const createArticle = () => {
  articleStore.setArticle(null);
  router.push('/article/create');
};
</script>

<template>
  <div v-if="user" class="mx-auto overflow-hidden border-2 w-96 border-lime-600 bg-neutral-900">
    <div class="relative pt-6" @click="createArticle">
      <img
        v-if="user.photo"
        :src="user.photo"
        :alt="`${user.firstName}-avatar`"
        class="object-cover w-1/2 mx-auto"
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
      <!-- BUG WITH IDS-->
      <div v-if="user.id === userId" class="flex items-center justify-between gap-2 mt-6">
        <button
          @click="openModal"
          class="w-full px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
        >
          Edit Profile
        </button>

        <button
          @click="createArticle"
          class="w-full px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
        >
          Create article
        </button>
      </div>

      <ModalWrapper :isOpen="isModalOpen" @close="closeModal" title="Edit Profile">
        <UpdateUserForm />
      </ModalWrapper>
    </div>
  </div>
</template>
