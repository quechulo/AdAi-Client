export type ChatRole = 'user' | 'model' | 'assistant'

export interface ChatMessage {
  role: ChatRole
  parts: string[]
  generation_time?: number
  used_tokens?: number
}
