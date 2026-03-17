<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Ad } from '@/types/ad'
import { fetchAdById } from '@/api/ad'
import { fetchPexelsImage } from '@/api/pexels'

const props = defineProps<{ id?: string }>()
const router = useRouter()

const MAX_ADS = 1200

const ad = ref<Ad | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const imageLoading = ref(false)
const imageError = ref(false)
const imageUrl = ref<string | null>(null)
const inputId = ref('')

let controller: AbortController | null = null

const keywords = computed(() => ad.value?.keywords ?? [])
const currentIdNumber = computed(() => props.id ? parseInt(props.id, 10) : null)

const navigateToPrevious = () => {
  if (!currentIdNumber.value) return
  const prevId = currentIdNumber.value === 1 ? MAX_ADS : currentIdNumber.value - 1
  router.push(`/view-ad/demo/${prevId}`)
}

const navigateToNext = () => {
  if (!currentIdNumber.value) return
  const nextId = currentIdNumber.value === MAX_ADS ? 1 : currentIdNumber.value + 1
  router.push(`/view-ad/demo/${nextId}`)
}

const navigateToId = () => {
  const targetId = parseInt(inputId.value, 10)
  if (isNaN(targetId) || targetId < 1 || targetId > MAX_ADS) {
    alert(`Please enter a valid ID between 1 and ${MAX_ADS}`)
    return
  }
  router.push(`/view-ad/demo/${targetId}`)
  inputId.value = ''
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    navigateToPrevious()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    navigateToNext()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(() => props.id, async (id, _, onCleanup) => {
  ad.value = null
  error.value = null
  isLoading.value = true
  imageLoading.value = true
  imageError.value = false
  imageUrl.value = null

  controller?.abort()
  controller = new AbortController()

  const current = controller
  onCleanup(() => current.abort())

  // Only fetch if ID is provided
  if (!id) {
    isLoading.value = false
    return
  }

  try {
    ad.value = await fetchAdById(id, current.signal)
    
    // Fetch Pexels image based on keywords after ad is loaded
    if (ad.value) {
      const pexelsUrl = await fetchPexelsImage(ad.value.keywords, current.signal)
      imageUrl.value = pexelsUrl || ad.value.image_url
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load ad'
  } finally {
    isLoading.value = false
  }
}, { immediate: true })

onBeforeUnmount(() => {
  controller?.abort()
})
</script>

<template>
  <div class="page">
    <header class="header">
      <h1 class="title">Demo Ad Viewer</h1>
      <p class="subtitle" v-if="id">
        Currently viewing: <span class="mono">{{ id }}</span>
        <span class="counter"> — Ad {{ currentIdNumber }} of {{ MAX_ADS }}</span>
      </p>
      <p class="subtitle" v-else>No ad selected</p>
    </header>

    <div class="inputGroup">
      <label for="adIdInput" class="inputLabel">Go to Ad:</label>
      <input 
        id="adIdInput"
        v-model="inputId" 
        @keyup.enter="navigateToId"
        type="number" 
        :min="1"
        :max="MAX_ADS"
        :placeholder="`1-${MAX_ADS}`"
        class="idInput"
      />
      <button @click="navigateToId" class="goButton" title="Go to ad">Go</button>
    </div>

    <div class="card">
      <div v-if="!id" class="state placeholder">
        <p>No ad selected. Click the button below to start browsing ads.</p>
        <button @click="router.push('/view-ad/demo/1')" class="startButton">View Ad #1</button>
      </div>
      <div v-else-if="isLoading" class="state">Loading…</div>
      <div v-else-if="error" class="state error">
        {{ error }}
      </div>
      <div v-else-if="!ad" class="state">No data.</div>

      <template v-else>
        <div class="navControls" v-if="currentIdNumber">
          <button 
            @click="navigateToPrevious" 
            class="navButton left"
            :disabled="!currentIdNumber"
            title="Previous ad (← arrow key)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            @click="navigateToNext" 
            class="navButton right"
            :disabled="!currentIdNumber"
            title="Next ad (→ arrow key)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <div class="grid">
          <div class="media">
            <div class="mediaWrapper">
              <img 
                class="img" 
                :src="imageUrl || ad.image_url" 
                :alt="ad.title" 
                loading="lazy"
                @load="imageLoading = false"
                @error="imageError = true; imageLoading = false"
              />
              <div v-if="imageLoading" class="skeleton"></div>
              <div v-if="imageError && !imageLoading" class="imageError">
                <span>Failed to load image</span>
              </div>
            </div>
          </div>

          <div class="content">
            <h2 class="adTitle">{{ ad.title }}</h2>
            <p class="desc">{{ ad.description }}</p>

            <div class="kw">
              <div class="kwTitle">Keywords</div>
              <div class="chips">
                <span v-for="k in keywords" :key="k" class="chip">{{ k }}</span>
                <span v-if="keywords.length === 0" class="chip muted">(none)</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.page {
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: 20px;
}

.header {
  margin-bottom: 14px;
}

.title {
  margin: 0;
  font-size: 20px;
  color: #111827;
}

.subtitle {
  margin: 6px 0 0;
  font-size: 13px;
  color: rgba(17, 24, 39, 0.65);
}

.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
}

.card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 18px;
  background: #fff;
  overflow: hidden;
}

.state {
  padding: 18px;
  color: rgba(17, 24, 39, 0.75);
}

.state.error {
  color: #991b1b;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  color: rgba(17, 24, 39, 0.7);
}

.grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

.media {
  background: rgba(17, 24, 39, 0.03);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
}

@media (max-width: 900px) {
  .media {
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
}

.mediaWrapper {
  position: relative;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(17, 24, 39, 0.06);
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(17, 24, 39, 0) 0%,
    rgba(17, 24, 39, 0.08) 50%,
    rgba(17, 24, 39, 0) 100%
  );
  animation: shimmer 1.8s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.imageError {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.03);
  color: rgba(17, 24, 39, 0.5);
  font-size: 13px;
}

.content {
  padding: 18px;
}

.adTitle {
  margin: 0;
  font-size: 18px;
  color: #111827;
}

.desc {
  margin: 10px 0 0;
  line-height: 1.45;
  color: rgba(17, 24, 39, 0.8);
}

.kw {
  margin-top: 16px;
}

.kwTitle {
  font-size: 12px;
  color: rgba(17, 24, 39, 0.65);
  margin-bottom: 8px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;

  background: rgba(17, 24, 39, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);

  font-size: 12px;
  color: rgba(17, 24, 39, 0.8);
}

.chip.muted {
  opacity: 0.6;
}

.counter {
  font-weight: 500;
  color: rgba(17, 24, 39, 0.85);
}

.inputGroup {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.inputLabel {
  font-size: 16px;
  font-weight: 500;
  color: rgba(17, 24, 39, 0.8);
  white-space: nowrap;
}

.idInput {
  width: 140px;
  height: 44px;
  padding: 0 16px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  font-size: 16px;
  color: #111827;
  background: #fff;
  transition: border-color 0.2s ease;
}

.idInput:focus {
  outline: none;
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1);
}

.idInput::placeholder {
  color: rgba(17, 24, 39, 0.4);
}

.goButton {
  height: 44px;
  padding: 0 24px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  background: #111827;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.goButton:hover {
  background: #1f2937;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.goButton:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.placeholder {
  text-align: center;
  padding: 40px 18px;
  color: rgba(17, 24, 39, 0.65);
}

.placeholder p {
  margin: 0 0 20px;
}

.startButton {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #111827;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.startButton:hover {
  background: #1f2937;
  transform: translateY(-1px);
}

.startButton:active {
  transform: translateY(0);
}

.navControls {
  position: relative;
}

.navButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  cursor: pointer;
  transition: all 0.2s ease;
  
  color: #111827;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navButton:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.navButton:active:not(:disabled) {
  transform: translateY(-50%) scale(0.98);
}

.navButton:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.navButton.left {
  left: 20px;
}

.navButton.right {
  right: 20px;
}

@media (max-width: 900px) {
  .navButton.left {
    left: 10px;
  }
  
  .navButton.right {
    right: 10px;
  }
}

@media (max-width: 640px) {
  .page {
    padding: 12px;
  }

  .title {
    font-size: 18px;
  }

  .inputGroup {
    flex-wrap: wrap;
    justify-content: stretch;
    gap: 8px;
  }

  .inputLabel {
    width: 100%;
    text-align: left;
    font-size: 14px;
  }

  .idInput {
    flex: 1;
    min-width: 0;
  }

  .goButton {
    min-width: 72px;
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .page {
    padding: 10px;
  }

  .title {
    font-size: 16px;
  }

  .content {
    padding: 14px;
  }

  .navButton {
    width: 40px;
    height: 40px;
  }

  .navButton.left {
    left: 6px;
  }

  .navButton.right {
    right: 6px;
  }
}
</style>
