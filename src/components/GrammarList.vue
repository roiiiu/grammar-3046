<script setup lang="ts">
import type { Book, Grammar } from '~/types'

defineProps<{
  bookList: Book[]
  selectedGrammar: Grammar | null
  imageSrc: string
  onSelectedGrammar: (grammar: Grammar) => void
}>()
</script>

<template>
  <div border="l b r base" mx-2 of-auto>
    <template v-for="book in bookList">
      <template v-for="item in book.grammar">
        <div v-if="book.active" :key="item.id" hover=" bg-op-10 op100" bg="gray-300 op0" border="b base" p="x2 y3" cursor-pointer select-none text-left op70 @click="onSelectedGrammar(item)">
          <div
            flex items-center gap-3
          >
            <div
              v-if="item.level"
              p="1" :class="{
                'bg-blue': item.level === 5,
                'bg-emerald': item.level === 4,
                'bg-amber': item.level === 3,
                'bg-#f4a261': item.level === 2,
                'bg-#e76f51': item.level === 1,
              }" w-6 rounded text-center text="xs gray100"
            >
              {{ `N${item.level}` }}
            </div>
            <div v-else h-6 w-6 />
            <div>{{ item.title }}</div>
            <div flex-1 />
            <div mr-2 w-4>
              <div
                class="i-fa-book"
                :class="[`${book.color}`]"
              />
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<style scoped>

</style>
