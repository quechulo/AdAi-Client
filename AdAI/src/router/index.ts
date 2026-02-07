import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: () => import('@/views/ChatView.vue'),
      props: { mode: null },
    },
    {
      path: '/rag',
      name: 'chat-rag',
      component: () => import('@/views/ChatView.vue'),
      props: { mode: 'rag' },
    },
    {
      path: '/mcp',
      name: 'chat-mcp',
      component: () => import('@/views/ChatView.vue'),
      props: { mode: 'mcp' },
    },
    {
      path: '/agent',
      name: 'chat-agent',
      component: () => import('@/views/ChatView.vue'),
      props: { mode: 'agent' },
    },
    {
      path: '/:id',
      name: 'view-ad',
      component: () => import('@/views/ViewAdView.vue'),
      props: (route) => ({ id: String(route.params.id) }),
    },
  ],
})

export default router
