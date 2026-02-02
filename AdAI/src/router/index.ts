import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: () => import('@/views/ChatView.vue'),
    },
    {
      path: '/:mode',
      name: 'chat-with-mode',
      component: () => import('@/views/ChatView.vue'),
      props: (route) => ({ mode: String(route.params.mode) }),
    },
    {
      path: '/view-ad/:id',
      name: 'view-ad',
      component: () => import('@/views/ViewAdView.vue'),
      props: (route) => ({ id: String(route.params.id) }),
    },
  ],
})

export default router
