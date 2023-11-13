<script setup lang="ts">
import type { Book, Grammar } from '~/types'

const props = defineProps<{
  bookList: Book[]
  selectedGrammar: Grammar | null
  imageSrc: string
  onSelectedGrammar: (grammar: Grammar) => void
}>()

const shownGrammarList = computed<Grammar[]>(() => {
  return props.bookList
    .filter(item => item.active)
    .flatMap(item => item.grammar)
})

function getColorFromBook(book: string) {
  switch (book) {
    case 'blue':
      return 'text-#8ecae6'
    case 'pre':
      return 'text-#ffb703'
    case 'master':
      return 'text-#fb8500'
    case 'sentence':
      return 'text-#cdb4db'
  }
}
</script>

<template>
  <div border="l b r base" mx-2 of-auto>
    <template v-if="shownGrammarList.length > 0">
      <template v-for="item in shownGrammarList" :key="item.id">
        <div hover=" bg-op-10 op100" bg="gray-300 op0" border="b base" p="x2 y3" cursor-pointer select-none text-left op70 @click="onSelectedGrammar(item)">
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
                :class="[`${getColorFromBook(item.book)}`]"
              />
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div h-full w-full flex="~ col" items-center justify-end pb-3 text-sm>
        <div flex="~" gap-3 op-60>
          <div flex items-center>
            <p>
              开源项目地址：
            </p>
            <a i-carbon-logo-github op-60 hover:op100 href="https://github.com/roiiiu/grammar-3046" />
          </div>

          <div flex items-center>
            <p>
              问题反馈：
            </p>
            <a i-icon-park-outline-bug op-60 hover:op100 href="https://github.com/roiiiu/grammar-3046/issues/new" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
