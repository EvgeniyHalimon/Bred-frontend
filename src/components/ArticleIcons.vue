<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useArticleStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';

const isEditHovering = ref(false);
const isDeleteHovering = ref(false);
const route = useRoute();
const articleId = ref(route.params.id as string);

const articleStore = useArticleStore();
const router = useRouter();
const deleteArticle = async () => {
  const { status } = await articleStore.deleteArticle(articleId.value);
  if (status === 200) {
    articleStore.setArticle(null);
    router.push('/home');
  }
};

const createArticlePath = '/article/create';

const goToCreateArticle = () => {
  articleStore.setArticle(null);
  router.push(createArticlePath);
};
</script>

<template>
  <div class="flex gap-2">
    <button
      @mouseenter="isEditHovering = true"
      @mouseleave="isEditHovering = false"
      @click="goToCreateArticle"
    >
      <Icon
        :icon="isEditHovering ? 'mdi:pencil' : 'mdi:pencil-outline'"
        class="transition-all duration-500 cursor-pointer text-lime-600 hover:text-lime-500"
        :width="30"
        :height="30"
      />
    </button>

    <button
      @mouseenter="isDeleteHovering = true"
      @mouseleave="isDeleteHovering = false"
      @click="deleteArticle"
    >
      <Icon
        :icon="isDeleteHovering ? 'mdi:bin' : 'mdi:bin-outline'"
        class="transition-all duration-500 cursor-pointer text-lime-600 hover:text-lime-500"
        :width="30"
        :height="30"
      />
    </button>
  </div>
</template>
