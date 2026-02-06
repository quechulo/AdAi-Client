<script setup lang="ts">
defineProps<{
  title: string
  message: string
  confirmPositiveText?: string
  confirmNegativeText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'confirm', positive: boolean): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div class="dialog-overlay" @click="emit('cancel')">
      <div class="dialog" @click.stop>
        <div class="dialog-header">
          <h2 class="dialog-title">{{ title }}</h2>
        </div>

        <div class="dialog-body">
          <p class="dialog-message">{{ message }}</p>
        </div>

        <div class="dialog-footer">
          <button class="btn btn-secondary" @click="emit('cancel')">
            {{ cancelText || 'Cancel' }}
          </button>
          <button class="btn btn-negative" @click="emit('confirm', false)">
            {{ confirmNegativeText || 'Yes, this chat was off' }}
          </button>
          <button class="btn btn-primary" @click="emit('confirm', true)">
            {{ confirmPositiveText || 'Yes, this chat was nice' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.dialog {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 450px;
  width: 90%;
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.dialog-header {
  padding: 24px 24px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.dialog-title {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.dialog-body {
  padding: 20px 24px;
}

.dialog-message {
  margin: 0;
  color: #4b5563;
  font-size: 15px;
  line-height: 1.6;
}

.dialog-footer {
  padding: 16px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.btn:active {
  transform: scale(0.98);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-primary {
  background: #10b981;
  color: #fff;
}

.btn-primary:hover {
  background: #059669;
}

.btn-negative {
  background: #ef4444;
  color: #fff;
}

.btn-negative:hover {
  background: #dc2626;
}
</style>
