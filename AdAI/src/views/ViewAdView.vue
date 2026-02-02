<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watchEffect } from 'vue'
import type { Ad } from '@/types/ad'
import { fetchAdById } from '@/api/ads'

const props = defineProps<{ id: string }>()

const ad = ref<Ad | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

let controller: AbortController | null = null

const keywords = computed(() => ad.value?.keywords ?? [])

watchEffect(async (onCleanup) => {
  ad.value = null
  error.value = null
  isLoading.value = true

  controller?.abort()
  controller = new AbortController()

  const current = controller
  onCleanup(() => current.abort())

  try {
    ad.value = await fetchAdById(props.id, current.signal)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load ad'
  } finally {
    isLoading.value = false
  }
})

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
        <div class="hint">Expected endpoint: <span class="mono">/api/ads/{{ id }}</span></div>
      </div>
      <div v-else-if="!ad" class="state">No data.</div>

      <template v-else>
        <div class="grid">
          <div class="media">
            <img class="img" :src="ad.imageUrl" :alt="ad.title" loading="lazy" />
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
  grid-template-columns: 360px 1fr;
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

.img {
  width: 100%;
  height: 100%;
  max-height: 360px;
  object-fit: cover;
  display: block;
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
