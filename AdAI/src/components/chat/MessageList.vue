<script setup lang="ts">
import type { ChatMessage } from '@/types/chat'

defineProps<{
  messages: ChatMessage[]
}>()
</script>

<template>
  <div class="list" role="log" aria-live="polite">
    <div v-if="messages.length === 0" class="empty">
      Start a conversation — your messages appear here.
    </div>

    <div v-for="m in messages" :key="m.id" class="row" :data-role="m.role">
      <div class="bubble">
        <div class="meta">{{ m.role === 'user' ? 'You' : 'Assistant' }}</div>
        <div class="text">{{ m.content }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty {
  padding: 16px;
  border: 1px dashed rgba(0, 0, 0, 0.18);
  border-radius: 14px;
  color: rgba(17, 24, 39, 0.7);
  background: rgba(255, 255, 255, 0.6);
}

.row {
  display: flex;
}

.row[data-role='user'] {
  justify-content: flex-end;
}

.bubble {
  width: min(640px, 100%);
  padding: 12px;
  border-radius: 16px;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.row[data-role='user'] .bubble {
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.2);
}

.meta {
  font-size: 12px;
  color: rgba(17, 24, 39, 0.6);
  margin-bottom: 6px;
}

.text {
  white-space: pre-wrap;
  line-height: 1.35;
  color: #111827;
}
</style>
