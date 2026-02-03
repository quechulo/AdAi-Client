# Chat API Implementation

This document describes the professional implementation of the chat API system with proper error handling, timeouts, and retry logic.

## Features

### 🚀 Core Functionality
- **Multiple Chat Modes**: Supports `rag`, `mcp`, and `agent` chat modes
- **Automatic Retries**: Implements exponential backoff retry strategy (up to 2 retries)
- **Timeout Handling**: 30-second default timeout with graceful degradation
- **Error Recovery**: Comprehensive error handling with user-friendly messages

### 🛡️ Error Handling
- **Network Errors**: Detects connection issues and provides actionable feedback
- **Timeout Errors**: Identifies slow responses and suggests solutions
- **HTTP Errors**: Handles 4xx and 5xx errors with appropriate messages
- **Retry Logic**: Automatically retries on transient failures (network, timeout, 429, 5xx)

### ⚙️ Configuration
- **Base URL**: `http://localhost:8000/api/v1`
- **Default Timeout**: 30 seconds
- **Max Retries**: 2 attempts with exponential backoff
- **Retry Delay**: Starts at 1 second, doubles each attempt

## API Endpoints

### 1. RAG Chat
**Endpoint**: `POST /api/v1/rag-chat`

**Request Body**:
```json
{
  "message": "Your question here",
  "history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ],
  "top_k": 5
}
```

### 2. MCP Chat
**Endpoint**: `POST /api/v1/mcp-chat`

**Request Body**:
```json
{
  "message": "Your question here",
  "history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

### 3. Agentic Chat
**Endpoint**: `POST /api/v1/agentic-chat`

**Request Body**:
```json
{
  "message": "Your question here",
  "history": [
    {"role": "user", "content": "Previous message"},
    {"role": "assistant", "content": "Previous response"}
  ]
}
```

### Response Format
All endpoints return:
```json
{
  "response": "The AI's response text",
  "sources": [
    {
      "content": "Source content",
      "metadata": {}
    }
  ]
}
```

## Usage

### Basic Usage

```typescript
import { chatApi } from '@/api/chat'

// Send a message based on mode
const response = await chatApi.sendChatMessage(
  'Where do people go to travel?',
  messages,
  'rag' // or 'mcp' or 'agent'
)
```

### Mode-Specific Calls

```typescript
// RAG Chat with custom top_k
const ragResponse = await chatApi.sendRagChatMessage(
  'Your question',
  messages,
  10 // top_k parameter
)

// MCP Chat
const mcpResponse = await chatApi.sendMcpChatMessage(
  'Your question',
  messages
)

// Agentic Chat
const agentResponse = await chatApi.sendAgenticChatMessage(
  'Your question',
  messages
)
```

### Error Handling

```typescript
import { chatApi, ChatApiError } from '@/api/chat'

try {
  const response = await chatApi.sendChatMessage(message, history, mode)
  console.log(response.response)
} catch (error) {
  if (error instanceof ChatApiError) {
    if (error.isTimeout) {
      console.log('Request timed out')
    } else if (error.isNetworkError) {
      console.log('Network error occurred')
    } else {
      console.log(`Error ${error.status}: ${error.message}`)
    }
  }
}
```

### Custom Timeout

```typescript
// Set custom timeout for slow operations
chatApi.setRequestTimeout(60000) // 60 seconds
```

### Health Check

```typescript
const isHealthy = await chatApi.healthCheck()
if (!isHealthy) {
  console.log('Backend server is not responding')
}
```

## Architecture

### Class Structure

```
ChatApiService (singleton)
├── Axios Instance (configured with interceptors)
├── Error Handler (converts axios errors to ChatApiError)
├── Retry Logic (exponential backoff)
└── Message Converters (ChatMessage ↔ API format)
```

### Error Types

```typescript
class ChatApiError {
  message: string      // Human-readable error message
  status?: number      // HTTP status code (if applicable)
  code?: string        // Error code (e.g., ETIMEDOUT)
  isTimeout: boolean   // True if timeout error
  isNetworkError: boolean // True if network error
}
```

## Best Practices

1. **Always handle errors**: Wrap API calls in try-catch blocks
2. **Show user feedback**: Display loading states during API calls
3. **Validate mode**: Ensure mode is one of: 'rag', 'mcp', 'agent', or null
4. **History management**: Keep message history in proper format
5. **Timeout consideration**: Adjust timeout for expected response times

## Routes

The application uses the following routes:
- `/` - Default chat (mode: null)
- `/rag` - RAG-enhanced chat
- `/mcp` - MCP chat
- `/agent` - Agentic chat

## Component Integration

### ChatView Component

The ChatView component automatically:
- Manages message history
- Handles loading states
- Displays errors inline in the chat
- Provides detailed error messages to users
- Scrolls to new messages automatically

## Troubleshooting

### Common Issues

1. **"Network error" message**
   - Ensure backend is running on `http://localhost:8000`
   - Check CORS configuration on backend
   - Verify network connectivity

2. **"Request timeout" message**
   - Backend may be processing slowly
   - Consider increasing timeout with `setRequestTimeout()`
   - Check backend logs for bottlenecks

3. **"Invalid chat mode" error**
   - Ensure mode prop is 'rag', 'mcp', 'agent', or null
   - Check router configuration

## Dependencies

- `axios`: ^1.7.9 (or latest)
- `vue`: ^3.5.27
- `vue-router`: ^5.0.1

## Testing

To test the API integration:

1. Start the backend server:
   ```bash
   # Backend should be running on http://localhost:8000
   ```

2. Start the frontend:
   ```bash
   cd AdAI
   npm run dev
   ```

3. Navigate to different chat modes:
   - http://localhost:5173/rag
   - http://localhost:5173/mcp
   - http://localhost:5173/agent

## Future Enhancements

- [ ] Streaming responses support
- [ ] Message persistence
- [ ] Rate limiting indicators
- [ ] Response caching
- [ ] Offline mode with queue
- [ ] WebSocket support for real-time updates
