<script setup lang="ts">
</script>

<template>
  <div class="loading-indicator" role="status" aria-label="Generating response">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</template>

<style scoped>
.loading-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 0;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: rgba(17, 24, 39, 0.4);
  animation: pulse 1.4s ease-in-out infinite;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
