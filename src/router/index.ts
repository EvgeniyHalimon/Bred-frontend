import { createRouter, createWebHistory } from 'vue-router';
import { ArticleView, ArticlesView, AuthView, HomeView } from '../views';
import CreateOrUpdateArticleView from '@/views/CreateOrUpdateArticleView.vue';
import StarterView from '@/views/StarterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'starter',
      component: StarterView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView
    },
    {
      path: '/article/create',
      name: 'article/create',
      component: CreateOrUpdateArticleView
    }
  ]
});

export default router;
