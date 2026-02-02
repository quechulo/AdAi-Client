<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    disabled?: boolean
  }>(),
  {
    placeholder: 'Type a message…',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
}>()

const inputEl = ref<HTMLInputElement | null>(null)

const canSend = computed(() => !props.disabled && props.modelValue.trim().length > 0)

function onSend(): void {
  if (!canSend.value) return
  emit('send')
  // Keep focus for fast chatting
  inputEl.value?.focus()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key !== 'Enter') return
  event.preventDefault()
  onSend()
}

watch(
  () => props.disabled,
  (disabled) => {
    if (!disabled) inputEl.value?.focus()
  },
  { immediate: true },
)
</script>

<template>
  <div class="wrap">
    <input
      ref="inputEl"
      class="input"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      autocomplete="off"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown="onKeydown"
    />

    <button class="send" type="button" :disabled="!canSend" @click="onSend">Send</button>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  gap: 10px;
  align-items: center;

  padding: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  background: #fff;
}

.input {
  flex: 1;
  height: 40px;

  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 0 12px;

  font-size: 14px;
  outline: none;
}

.input:focus {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.14);
}

.send {
  height: 40px;
  padding: 0 14px;

  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #111827;
  color: #fff;

  cursor: pointer;
}

.send:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
