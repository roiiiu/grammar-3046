<script setup lang="ts">
import gsap from 'gsap'
import { useToastStore } from '~/store/toastStore'

const toastStore = useToastStore()
const toastRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.from(toastRef.value, { opacity: 0, scale: 0.5, y: -10, duration: 0.4, ease: 'back.inOut' })
})
</script>

<template>
  <div ref="toastRef" absolute px-3 py-2 left-0 flex items-center justify-between right-0 mx-auto w-30 bg-base top-5 z-99 border="~ base" rounded-lg>
    <div v-if="toastStore.type === 'success'" text-green i-carbon-checkmark-outline />
    <div v-else-if="toastStore.type === 'info'" text-warning i-carbon-warning />
    <div v-else-if="toastStore.type === 'error'" text-red i-carbon-error-outline />
    <div flex="~ col">
      <p>{{ toastStore.message }}</p>
      <p text="xs" text-light>
        {{ toastStore.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
