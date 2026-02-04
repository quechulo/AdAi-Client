<script setup lang="ts">
import { nextTick, ref } from 'vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import MessageList from '@/components/chat/MessageList.vue'
import type { ChatMessage } from '@/types/chat'
import { chatApi, ChatApiError } from '@/api/chat'

const props = defineProps<{ mode: 'rag' | 'mcp' | 'agent' | null }>()

const draft = ref('')
const messages = ref<ChatMessage[]>([])
const isModelGenerating = ref(false)
const error = ref<string | null>(null)

const scrollEl = ref<HTMLDivElement | null>(null)

function scrollToBottom(): void {
  const el = scrollEl.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

async function sendMessage(): Promise<void> {
  const content = draft.value.trim()
  if (!content || isModelGenerating.value) return

  // Clear any previous errors
  error.value = null

  const userMessage: ChatMessage = {
    role: 'user',
    parts: [content],
  }

  messages.value = [...messages.value, userMessage]
  draft.value = ''

  await nextTick()
  scrollToBottom()

  isModelGenerating.value = true
  try {
    // Get message history (excluding the current user message)
    const history = messages.value.slice(0, -1)
    
    // Send the request based on the mode
    const response = await chatApi.sendChatMessage(content, history, props.mode)
    
    const modelResponseMessage: ChatMessage = {
      role: 'assistant',
      parts: [response.response],
    }

    messages.value = [...messages.value, modelResponseMessage]
  } catch (err) {
    // Handle errors gracefully
    console.error('Chat error:', err)
    
    if (err instanceof ChatApiError) {
      error.value = err.message
      
      // Add error message to chat
      const errorMessage: ChatMessage = {
        role: 'assistant',
        parts: [`❌ Error: ${err.message}`],
      }
      
      if (err.isTimeout) {
        errorMessage.parts[0] += '\n\nThe request timed out. The server may be overloaded or the request is taking too long.'
      } else if (err.isNetworkError) {
        errorMessage.parts[0] += '\n\nPlease ensure:\n• The backend server is running on http://localhost:8000\n• Your network connection is stable'
      }
      
      messages.value = [...messages.value, errorMessage]
    } else {
      // Handle non-ChatApiError errors
      const errorMsg = err instanceof Error ? err.message : String(err)
      error.value = errorMsg
      const errorMessage: ChatMessage = {
        role: 'assistant',
        parts: [`❌ Error: ${errorMsg}`],
      }
      messages.value = [...messages.value, errorMessage]
    }
  } finally {
    isModelGenerating.value = false
  }

  await nextTick()
  scrollToBottom()
}
</script>

<template>
  <div class="page">
    <header class="header">
      <h1 class="title">Conversational AdAI {{ props.mode }} playground</h1>
    </header>

    <div ref="scrollEl" class="scroll">
      <MessageList :messages="messages" :isModelGenerating="isModelGenerating" />
    </div>

    <footer class="composer" aria-label="Message composer">
      <ChatInput v-model="draft" :disabled="isModelGenerating" @send="sendMessage" />
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
