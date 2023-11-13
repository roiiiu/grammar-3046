<script setup lang="ts">
defineProps<{
  iconLeft?: string
  iconRight?: string
  text: string
}>()
defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button flex items-center gap-1 border="~ base" p="x3 y1.5" rounded transition-200 @click="$emit('click')">
    <div v-if="iconLeft" :class="iconLeft" />
    <span>{{ text }}</span>
    <div v-if="iconRight" :class="iconRight" />
  </button>
</template>

<style scoped>

</style>
