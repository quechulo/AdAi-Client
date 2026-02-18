<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { Ad } from '@/types/ad'
import { fetchAdById } from '@/api/ad'
import { fetchPexelsImage } from '@/api/pexels'

const props = defineProps<{ id: string }>()

const ad = ref<Ad | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const imageLoading = ref(false)
const imageError = ref(false)
const imageUrl = ref<string | null>(null)

let controller: AbortController | null = null

const keywords = computed(() => ad.value?.keywords ?? [])

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
      <h1 class="title">Ad Details</h1>
      <p class="subtitle">Viewing: <span class="mono">{{ id }}</span></p>
    </header>

    <div class="card">
      <div v-if="isLoading" class="state">Loading…</div>
      <div v-else-if="error" class="state error">
        {{ error }}
      </div>
      <div v-else-if="!ad" class="state">No data.</div>

      <template v-else>
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
      </template>
    </div>
  </div>
</template>

<style scoped>
.page {
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
</style>
