<script setup lang="ts">
import { computed } from 'vue'
import { useChatStore } from '@/stores/chat'

const props = defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ (e: 'update:collapsed', value: boolean): void }>()

const chatStore = useChatStore()

const toggleLabel = computed(() => (props.collapsed ? 'Expand menu' : 'Collapse menu'))
const hasMessages = computed(() => chatStore.messages.length > 0)

function toggle(): void {
  emit('update:collapsed', !props.collapsed)
}

function handleStartNewChat(): void {
  chatStore.openNewChatDialog()
}
</script>

<template>
  <aside class="aside" :data-collapsed="collapsed">
    <div class="top">
      <div class="brand" :title="collapsed ? 'AdAI' : undefined">
        <span class="logo">A</span>
        <span v-if="!collapsed" class="name">AdAI</span>
      </div>

      <button class="toggle" type="button" :aria-label="toggleLabel" @click="toggle">
        <span aria-hidden="true">☰</span>
      </button>
    </div>

    <nav class="nav" aria-label="Main navigation">
      <div v-if="hasMessages" class="link link-button" @click="handleStartNewChat">
        <span class="icon" aria-hidden="true">✨</span>
        <span v-if="!collapsed" class="label">Start new chat</span>
      </div>

      <RouterLink class="link" active-class="active" to="/">
        <span class="icon" aria-hidden="true">💬</span>
        <span v-if="!collapsed" class="label">Chat</span>
      </RouterLink>

      <RouterLink class="link" active-class="active" to="/view-ad/demo">
        <span class="icon" aria-hidden="true">🧾</span>
        <span v-if="!collapsed" class="label">View Ad (demo)</span>
      </RouterLink>

      <RouterLink class="link" active-class="active" to="/rag">
        <span class="icon" aria-hidden="true">💬</span>
        <span v-if="!collapsed" class="label">Chat with RAG</span>
      </RouterLink>

      <RouterLink class="link" active-class="active" to="/mcp">
        <span class="icon" aria-hidden="true">💬</span>
        <span v-if="!collapsed" class="label">Chat with MCP</span>
      </RouterLink>

      <RouterLink class="link" active-class="active" to="/agent">
        <span class="icon" aria-hidden="true">💬</span>
        <span v-if="!collapsed" class="label">Chat with AGENT</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.aside {
  --aside-width: 280px;
  --aside-width-collapsed: 64px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  width: var(--aside-width);
  min-width: var(--aside-width);
  height: 100%;

  padding: 12px;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
}

.aside[data-collapsed='true'] {
  width: var(--aside-width-collapsed);
  min-width: var(--aside-width-collapsed);
  padding: 12px 10px;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  font-weight: 700;
}

.name {
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.toggle {
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  color: #111827;
  border-radius: 10px;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.toggle:hover {
  background: rgba(17, 24, 39, 0.03);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 10px;
  border-radius: 12px;
  text-decoration: none;
  color: #111827;

  border: 1px solid transparent;
}

.link:hover {
  background: rgba(17, 24, 39, 0.03);
}

.link.active {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.25);
}

.link-button {
  cursor: pointer;
  background: rgba(139, 92, 246, 0.08);
  border-color: rgba(139, 92, 246, 0.2);
}

.link-button:hover {
  background: rgba(139, 92, 246, 0.12);
}

.icon {
  width: 22px;
  text-align: center;
}

.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer {
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.hint {
  font-size: 12px;
  color: rgba(17, 24, 39, 0.7);
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}
</style>
