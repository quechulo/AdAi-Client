<script setup lang="ts">
import type { ChatMessage } from '@/types/chat'
import { renderMarkdown } from '@/utils/markdown'

defineProps<{
  messages: ChatMessage[]
}>()
</script>

<template>
  <div class="list" role="log" aria-live="polite">
    <div v-if="messages.length === 0" class="empty">
      Start a conversation — your messages appear here.
    </div>

    <div v-for="(m, idx) in messages" :key="`${idx}-${m.role}`" class="row" :data-role="m.role">
      <div class="bubble">
        <div class="meta">{{ m.role === 'user' ? 'You' : 'Assistant' }}</div>
        <div v-if="m.role === 'user'" class="text">{{ m.parts.join('') }}</div>
        <div v-else class="text markdown" v-html="renderMarkdown(m.parts.join(''))"></div>
      </div>
    </div>
  </div>
  <code>{{ messages }}</code>
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

/* Markdown styles */
.text.markdown {
  white-space: normal;
}

.text.markdown :first-child {
  margin-top: 0;
}

.text.markdown :last-child {
  margin-bottom: 0;
}

.text.markdown p {
  margin: 0.8em 0;
}

.text.markdown h1,
.text.markdown h2,
.text.markdown h3,
.text.markdown h4,
.text.markdown h5,
.text.markdown h6 {
  margin: 1em 0 0.5em;
  font-weight: 600;
  line-height: 1.3;
}

.text.markdown h1 { font-size: 1.5em; }
.text.markdown h2 { font-size: 1.3em; }
.text.markdown h3 { font-size: 1.15em; }
.text.markdown h4 { font-size: 1em; }

.text.markdown ul,
.text.markdown ol {
  margin: 0.8em 0;
  padding-left: 1.5em;
}

.text.markdown li {
  margin: 0.3em 0;
}

.text.markdown code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', Consolas, monospace;
  font-size: 0.9em;
}

.text.markdown pre {
  background: rgba(0, 0, 0, 0.05);
  padding: 12px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 0.8em 0;
}

.text.markdown pre code {
  background: none;
  padding: 0;
  font-size: 0.85em;
}

.text.markdown blockquote {
  border-left: 3px solid rgba(0, 0, 0, 0.15);
  padding-left: 1em;
  margin: 0.8em 0;
  color: rgba(17, 24, 39, 0.8);
}

.text.markdown a {
  color: #3b82f6;
  text-decoration: none;
}

.text.markdown a:hover {
  text-decoration: underline;
}

.text.markdown hr {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin: 1em 0;
}

.text.markdown table {
  border-collapse: collapse;
  width: 100%;
  margin: 0.8em 0;
}

.text.markdown th,
.text.markdown td {
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5em;
  text-align: left;
}

.text.markdown th {
  background: rgba(0, 0, 0, 0.03);
  font-weight: 600;
}
</style>
