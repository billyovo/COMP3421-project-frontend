import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import CategoryView from '../views/CategoryView.vue';
import PostTitleView from '../views/PostTitleView.vue';
import PostView from '../views/PostView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: LoginView
    },
    {
      path: '/category',
      name: 'choose category',
      component: CategoryView
    },
    {
      path: '/category/:categoryID/page/:page',
      name: 'view posts title',
      component: PostTitleView
    },
    {
      path: '/post/:postID/page/:page',
      name: 'view post',
      component: PostView
    }
  ]
})

export default router
