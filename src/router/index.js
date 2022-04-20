import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import CategoryView from '../views/CategoryView.vue';
import PostTitleView from '../views/PostTitleView.vue';
import PostView from '../views/PostView.vue';
import CreateView from '../views/CreateView.vue';

const router = createRouter({
  history: createWebHashHistory("./"),
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
    },
    {
      path: '/post/create/category/:category',
      name: 'create post',
      component: CreateView
    }
  ]
})

export default router
