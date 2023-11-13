<script setup lang="ts">
import type { Book } from '~/types'

defineProps<{
  bookList: Book[]
  toggleBook: (bookName: string) => void
}>()
</script>

<template>
  <div flex items-center gap4 text-sm ml-auto>
    <div v-for="item in bookList" :key="item.book">
      <div flex cursor-pointer items-center gap1 text-xs @click="toggleBook(item.book)">
        <div
          class="i-fa-book" :class="[`${item.color}`, { 'text-gray-400': !item.active }]"
        />
        <div hidden lg:block>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
