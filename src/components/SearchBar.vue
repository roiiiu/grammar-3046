<script setup lang="ts">
import { isRomaji, toKana } from 'wanakana'

const props = defineProps<{
  onSearch: (value: string) => void
}>()

const inputContent = ref('')
watchDebounced(
  inputContent,
  (val) => {
    if (isRomaji(val))
      val = toKana(val)
    props.onSearch(val)
  },
  { debounce: 0, maxWait: 0 },
)
</script>

<template>
  <div border="~ rounded base" relative flex items-center text-2xl font-200 shadow>
    <input v-model="inputContent" p="x6 y4" autocomplete="off" type="text" placeholder="日本語！(支持罗马字)" w-full border-none bg-transparent outline-none>
    <div v-if="inputContent !== ''" text="gray400 op60" i-carbon-close mr-3 cursor-pointer @click="inputContent = ''" />
  </div>
</template>

<style scoped>

</style>
