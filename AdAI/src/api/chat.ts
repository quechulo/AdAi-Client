import axios, { type AxiosError, type AxiosInstance } from 'axios'
import type { ChatMessage } from '@/types/chat'

const BASE_URL = 'http://localhost:8000/api/v1'
const DEFAULT_TIMEOUT = 50000 // 50 seconds
const MAX_RETRIES = 2
const RETRY_DELAY = 1000 // 1 second

export interface ChatRequestBody {
  message: string
  history: Array<{ role: string; content: string }>
  top_k?: number
}

export interface ChatResponse {
  response: string
  generation_time: number
  used_tokens: number
  sources?: Array<{ content: string; metadata?: Record<string, unknown> }>
}

export class ChatApiError extends Error {
  public readonly status?: number
  public readonly code?: string
  public readonly isTimeout: boolean
  public readonly isNetworkError: boolean

  constructor(
    message: string,
    options: {
      status?: number
      code?: string
      isTimeout?: boolean
      isNetworkError?: boolean
    } = {},
  ) {
    super(message)
    this.name = 'ChatApiError'
    this.status = options.status
    this.code = options.code
    this.isTimeout = options.isTimeout ?? false
    this.isNetworkError = options.isNetworkError ?? false
  }
}

class ChatApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: DEFAULT_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    // Response interceptor for standardized error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error))
      },
    )
  }

  private handleError(error: AxiosError): ChatApiError {
    console.error('API Error:', error)
    
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      return new ChatApiError('Request timeout. The server took too long to respond.', {
        code: error.code,
        isTimeout: true,
      })
    }

    if (!error.response) {
      return new ChatApiError(
        'Network error. Please check your connection and ensure the server is running.',
        {
          code: error.code,
          isNetworkError: true,
        },
      )
    }

    const status = error.response.status
    let message = 'An unexpected error occurred.'

    if (status >= 500) {
      message = 'Server error. Please try again later.'
    } else if (status === 404) {
      message = 'Endpoint not found. Please check the API configuration.'
    } else if (status >= 400) {
      const errorData = error.response.data as { detail?: string; message?: string }
      message = errorData?.detail || errorData?.message || 'Bad request. Please check your input.'
    } else if (status === 429) {
      message = 'Too many requests. Please slow down.'
    }

    console.error('Error response data:', error.response.data)
    
    return new ChatApiError(message, {
      status,
      code: error.code,
    })
  }

  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    retries: number = MAX_RETRIES,
  ): Promise<T> {
    let lastError: ChatApiError | undefined

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await requestFn()
      } catch (error) {
        lastError = error instanceof ChatApiError ? error : new ChatApiError('Unknown error')

        // Don't retry on client errors (4xx) except for 429
        if (lastError.status && lastError.status >= 400 && lastError.status < 500 && lastError.status !== 429) {
          throw lastError
        }

        // Don't retry if it's the last attempt
        if (attempt === retries) {
          throw lastError
        }

        // Wait before retrying (exponential backoff)
        const delay = RETRY_DELAY * Math.pow(2, attempt)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }

    throw lastError || new ChatApiError('Request failed after retries')
  }

  async sendRagChatMessage(
    message: string,
    history: ChatMessage[],
    topK: number = 5,
  ): Promise<ChatResponse> {
    return this.retryRequest(async () => {
      const response = await this.client.post<ChatResponse>('/rag-chat', {
        message,
        history,
        top_k: topK,
      })
      return response.data
    })
  }

  async sendMcpChatMessage(message: string, history: ChatMessage[]): Promise<ChatResponse> {
    return this.retryRequest(async () => {
      const response = await this.client.post<ChatResponse>('/mcp-chat', {
        message,
        history,
      })
      return response.data
    })
  }

  async sendAgenticChatMessage(message: string, history: ChatMessage[]): Promise<ChatResponse> {
    return this.retryRequest(async () => {
      const response = await this.client.post<ChatResponse>('/agentic-chat', {
        message,
        history,
      })
      return response.data
    })
  }

  async sendBasicChatMessage(message: string, history: ChatMessage[]): Promise<ChatResponse> {
    return this.retryRequest(async () => {
      const response = await this.client.post<ChatResponse>('/chat', {
        message,
        history,
      })
      return response.data
    })
  }

  async sendChatMessage(
    message: string,
    history: ChatMessage[],
    mode: 'rag' | 'mcp' | 'agent' | null,
  ): Promise<ChatResponse> {
    switch (mode) {
      case 'rag':
        return this.sendRagChatMessage(message, history)
      case 'mcp':
        return this.sendMcpChatMessage(message, history)
      case 'agent':
        return this.sendAgenticChatMessage(message, history)
      default:
        return this.sendBasicChatMessage(message, history)
    }
  }

  // Allow customizing timeout for specific requests
  setRequestTimeout(timeout: number): void {
    this.client.defaults.timeout = timeout
  }

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/health', { timeout: 5000 })
      return true
    } catch {
      return false
    }
  }

  // Save chat history
  async saveChatHistory(
    history: ChatMessage[],
    mode: 'rag' | 'mcp' | 'agent' | 'basic',
    helpful: boolean,
  ): Promise<{ success: boolean }> {
    return this.retryRequest(async () => {
      const response = await this.client.post<{ success: boolean }>('/save-chat-history', {
        history,
        mode,
        helpful,
        version: 1.0
      })
      return response.data
    })
  }
}

// Export a singleton instance
export const chatApi = new ChatApiService()
