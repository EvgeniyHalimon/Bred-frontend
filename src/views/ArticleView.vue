<script setup lang="ts">
import { useArticleStore, useCommentsStore, useReactionsStore, useUserStore } from '@/store';
import { computed, ref, toRefs, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { getInitials, formatDate } from '@/shared/utils';
import { CommentForm, CommentsComponent } from '@/components';
import { Icon } from '@iconify/vue';
const route = useRoute();
const articleId = ref(route.params.id as string);

const articleStore = useArticleStore();
const commentsStore = useCommentsStore();
const reactionsStore = useReactionsStore();
const { article } = toRefs(articleStore);
const { comments } = toRefs(commentsStore);
const { reactions } = toRefs(reactionsStore);
const userStore = useUserStore();

const { user } = toRefs(userStore);
const getArticle = async () => {
  const { data } = await articleStore.fetchArticle(articleId.value);
  if (data) {
    console.log('🚀 ~ file: ArticleView.vue:16 ~ getArticle ~ data:', data);
    articleStore.setArticle(data);
    commentsStore.setComments(data.comments);
    reactionsStore.setReactions(data.reactions);
  }
};

const isUpvoted = computed(
  () =>
    user.value &&
    reactions.value?.some(
      (reaction) => reaction.userId === user.value?.id && reaction.reactionType === 'upvote'
    )
);

const isDownvoted = computed(
  () =>
    user.value &&
    reactions.value?.some(
      (reaction) => reaction.userId === user.value?.id && reaction.reactionType === 'downvote'
    )
);

watchEffect(async () => await getArticle());
</script>

<template>
  <div v-if="article">
    <div class="flex justify-between gap-8 mb-5">
      <div>
        <img
          v-if="article.author.photo"
          :src="article.author.photo"
          :alt="`${article.author.firstName} ${article.author.lastName}-avatar`"
          class="object-cover w-24 h-24 rounded-full"
        />
        <div v-else class="flex items-center justify-center w-24 h-24 rounded-full bg-neutral-800">
          <span class="font-mono text-2xl font-bold text-lime-600">
            {{ getInitials(article.author.firstName, article.author.lastName) }}
          </span>
        </div>
        <div>
          <h2 class="font-mono text-2xl font-semibold text-lime-600">
            {{ article.author.firstName }} {{ article.author.lastName }}
          </h2>
          <p class="font-mono text-lg text-lime-600">{{ formatDate(article.createdAt) }}</p>
        </div>
      </div>

      <div class="flex gap-2">
        <Icon v-if="isUpvoted" icon="mdi:chevron-up-box" color="#65a30d" :width="30" />
        <Icon v-else icon="mdi:chevron-up-box" color="#65a30d" :rotate="90" :width="30" />
        <Icon v-if="isDownvoted" icon="mdi:chevron-up-box-outline" color="#65a30d" :width="30" />
        <Icon v-else icon="mdi:chevron-up-box-outline" color="#65a30d" :rotate="90" :width="30" />
      </div>
    </div>
    <div class="flex flex-col gap-2 mb-5">
      <h1 class="font-mono text-5xl font-bold text-lime-600">{{ article.title }}</h1>
      <p class="pb-6 font-mono text-xl leading-relaxed border-b text-lime-600 border-lime-400">
        {{ article.text }}
      </p>
    </div>
    <CommentsComponent :comments="article.comments" />
    <CommentForm />
  </div>
</template>
