import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/auth/login.vue'),
      name: 'auth.login',
    },
    {
      path: '/register',
      component: () => import('@/pages/auth/register.vue'),
      name: 'auth.register',
    },
    {
      path: '/chats',
      component: () => import('@/pages/chat/index.vue'),
      name: 'chat.index',
    },
    {
      path: '/chats/:id',
      component: () => import('@/pages/chat/show.vue'),
      name: 'chat.show',
    },

  ],
})

export default router
