<script setup lang="ts">
defineProps<{
  imageSrc: string
  changePage: (type: 'pre' | 'next') => void
}>()
</script>

<template>
  <div v-show="imageSrc" p="t8" hidden h-full flex-col of-hidden lg:flex>
    <div h-full flex flex-col gap-5 of-y-auto rounded>
      <img
        object-cover
        :src="imageSrc"
      >
    </div>
    <div flex justify-between text="sm op80" gap-2 m="t2 b-4">
      <PageButton
        icon-left="i-carbon-chevron-left"
        text="上一页"
        @click="() => {
          changePage('pre')
        }"
      />
      <PageButton
        icon-right="i-carbon-chevron-right"
        text="下一页"
        @click="() => {
          changePage('next')
        }"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
