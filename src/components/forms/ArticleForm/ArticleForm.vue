<script setup lang="ts">
import { useRouter } from 'vue-router';
import { CreateArticleSchema } from './CreateArticleSchema';
import { useArticleStore } from '@/store';
import { toRefs } from 'vue';
import { ErrorMessage, useField, useForm } from 'vee-validate';
import { PatchArticleSchema } from './PatchArticleSchema';
import { CustomInput } from '@/components';
import { tryCatchWrapper, showSuccessNotification } from '@/shared';

interface ArticleValues {
  text: string;
}

const router = useRouter();
const articleStore = useArticleStore();
const { article } = toRefs(articleStore);

const schema = article.value ? PatchArticleSchema : CreateArticleSchema;

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: article.value ? article.value.title : '',
    text: article.value ? article.value.text : ''
  }
});

const { value: title } = useField<string>('title');
const { value: text } = useField<string>('text');

const goToArticle = (id: string) => {
  router.push({ name: 'article', params: { id } });
};

const patchArticle = async (values: ArticleValues, id: string) => {
  const { data } = await articleStore.patchArticle(values, id);
  if (data) {
    articleStore.updateArticle(data);

    goToArticle(id);
  }
};

const createArticle = async (values: ArticleValues) => {
  const { data } = await articleStore.createArticle(values);
  if (data) {
    showSuccessNotification('Article successfully created.');
    goToArticle(data.id);
  }
};

const onSubmit = handleSubmit(async (values: ArticleValues) => {
  if (article.value) {
    const { id } = article.value;
    await tryCatchWrapper(() => patchArticle(values, id));
  } else {
    await tryCatchWrapper(() => createArticle(values));
  }
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="relative">
    <CustomInput name="title" type="text" v-model="title" />
    <textarea
      id="text"
      name="text"
      placeholder="What's on your mind?"
      v-model="text"
      class="block w-full px-3 py-2 mb-8 font-mono bg-black border resize-none h-60 text-lime-500 border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-600"
    ></textarea>
    <div class="flex gap-2">
      <button
        @click="
          () => {
            if (article?.id) {
              goToArticle(article.id);
              return;
            }
            router.push('/home');
          }
        "
        class="px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
      >
        Close
      </button>
      <button
        type="submit"
        class="px-4 py-2 font-mono text-sm font-medium transition-all cursor-pointer hover:font-bold duration-400 clip-path-custom text-neutral-900 bg-lime-600 hover:bg-lime-500"
      >
        Submit
      </button>
    </div>
    <ErrorMessage name="text" class="absolute mt-1 font-mono text-sm text-red-600" />
  </form>
</template>
