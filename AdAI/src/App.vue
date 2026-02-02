<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import AsideMenu from '@/components/AsideMenu.vue'

const collapsed = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('adai.aside.collapsed')
  collapsed.value = saved === 'true'
})

watch(collapsed, (value) => {
  localStorage.setItem('adai.aside.collapsed', String(value))
})
</script>

<template>
  <div class="app">
    <AsideMenu v-model:collapsed="collapsed" />

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100%;
}
</style>

<style scoped>
.app {
  display: flex;
  height: 100%;
  background: #f8fafc;
}

.main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
