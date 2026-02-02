<script setup lang="ts">
import { nextTick, ref } from 'vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import MessageList from '@/components/chat/MessageList.vue'
import type { ChatMessage } from '@/types/chat'

const props = defineProps<{ mode: string }>()

const draft = ref('')
const messages = ref<ChatMessage[]>([])
const isSending = ref(false)

const scrollEl = ref<HTMLDivElement | null>(null)

function scrollToBottom(): void {
  const el = scrollEl.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

async function sendMessage(): Promise<void> {
  const content = draft.value.trim()
  if (!content || isSending.value) return

  const userMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'user',
    content,
    createdAt: Date.now(),
  }

  messages.value = [...messages.value, userMessage]
  draft.value = ''

  await nextTick()
  scrollToBottom()

  // Placeholder assistant response (swap with your backend call)
  isSending.value = true
  try {
    await new Promise((r) => setTimeout(r, 250))
    const assistantMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `Got it: “${content}”`,
      createdAt: Date.now(),
    }
    messages.value = [...messages.value, assistantMessage]
  } finally {
    isSending.value = false
  }

  await nextTick()
  scrollToBottom()
}
</script>

<template>
  <div class="page">
    <header class="header">
      <h1 class="title">Conversational AdAI playground</h1>
      <h2>{{ props.mode }}</h2>
    </header>

    <div ref="scrollEl" class="scroll">
      <MessageList :messages="messages" />
    </div>

    <footer class="composer" aria-label="Message composer">
      <ChatInput v-model="draft" :disabled="isSending" @send="sendMessage" />
    </footer>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.header {
  padding: 20px 20px 10px;
}

.title {
  margin: 0;
  font-size: 20px;
  color: #111827;
}

.subtitle {
  margin: 6px 0 0;
  color: rgba(17, 24, 39, 0.65);
  font-size: 13px;
}

.scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 10px 20px;
}

.composer {
  padding: 12px 20px 18px;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.65));
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
