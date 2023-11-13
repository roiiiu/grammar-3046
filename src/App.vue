<script lang="ts" setup>
import { useToastStore } from './store/toastStore'
import { webVitals } from './vitals'

const toastStore = useToastStore()

const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID
if (analyticsId) {
  webVitals({
    path: location.pathname,
    params: location.search,
    analyticsId,
    debug: import.meta.env.DEV,
  })
}
</script>

<template>
  <main absolute inset-0 font-sans text=" gray-700 dark:gray-200">
    <div id="preview-modal" />
    <Toast v-if="toastStore.show" />
    <RouterView />
  </main>
</template>
