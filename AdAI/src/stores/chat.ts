import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ChatMessage } from '@/types/chat'
import { chatApi } from '@/api/chat'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const showNewChatDialog = ref(false)

  function addMessage(message: ChatMessage) {
    messages.value = [...messages.value, message]
  }

  function setMessages(newMessages: ChatMessage[]) {
    messages.value = newMessages
  }

  function openNewChatDialog() {
    showNewChatDialog.value = true
  }

  function closeNewChatDialog() {
    showNewChatDialog.value = false
  }

  async function startNewChat(
    mode: 'rag' | 'mcp' | 'agent' | 'basic',
    helpful: boolean,
  ): Promise<void> {
    try {
      // Save chat history before clearing
      if (messages.value.length > 0) {
        await chatApi.saveChatHistory(messages.value, mode, helpful)
      }
      
      // Clear messages after successful save
      messages.value = []
      closeNewChatDialog()
    } catch (error) {
      console.error('Failed to save chat history:', error)
      throw error
    }
  }

  return {
    messages,
    showNewChatDialog,
    addMessage,
    setMessages,
    openNewChatDialog,
    closeNewChatDialog,
    startNewChat,
  }
})
