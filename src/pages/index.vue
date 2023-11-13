<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import type { Book, Grammar } from '~/types'
import { client } from '~/meiliSearch'

const imageSrc = ref('')
const selectedGrammar = ref<Grammar | null>(null)
const isPreviewModalVisible = ref(false)
const storeState = useStorage('grammar-store', { activeBookList: ['blue', 'pre'] })
const { width } = useWindowSize()
useFavicon('/grammarIcon.svg')
useTitle('文法查阅')

const isSmall = computed(() => {
  return width.value < 1024
})

const pagePathInfo = computed(() => {
  const regex = /([^\(]*\()(\d+)(.+)/
  const match = selectedGrammar.value?.path.match(regex)
  if (match)
    return match
})
const ip = import.meta.env.VITE_IP
const bookList = $ref<Book[]>([
  {
    book: 'blue',
    name: '蓝宝书',
    active: storeState.value.activeBookList.includes('blue'),
    color: 'text-#8ecae6',
    grammar: [],
  },
  {
    book: 'pre',
    name: '考前对策',
    active: storeState.value.activeBookList.includes('pre'),
    color: 'text-#ffb703',
    grammar: [],
  },
  {
    book: 'master',
    name: '完全掌握',
    active: storeState.value.activeBookList.includes('master'),
    color: 'text-#fb8500',
    grammar: [],
  },
  {
    book: 'sentence',
    name: '句型辞典',
    active: storeState.value.activeBookList.includes('sentence'),
    color: 'text-#cdb4db',
    grammar: [],
  },
])

async function fetchGrammar(title: string) {
  if (title === '') {
    bookList.forEach((item) => {
      item.grammar = []
    })
    return
  }
  // const res = await axios.get<GrammarResult[]>(`${ip}/api/v1/grammar/search/${title}`)
  // bookList.forEach((item, index) => {
  //   item.grammar = res.data[index].grammar
  // })

  client.index('grammar')
    .search(title, { attributesToSearchOn: ['title'], limit: 5000 })
    .then((res) => {
      if (res.hits) {
        const grammars = res.hits.map((item) => {
          return item as Grammar
        })
        bookList.forEach((item) => {
          item.grammar = grammars.filter((grammar) => {
            return grammar.book === item.book
          })
        })
      }
    })
}

function selectGrammar(grammar: Grammar) {
  imageSrc.value = `${ip}/static/JP${grammar.path}`
  selectedGrammar.value = grammar
  if (isSmall.value)
    isPreviewModalVisible.value = true
}

function changePage(type: 'pre' | 'next') {
  if (selectedGrammar.value) {
    const preFix = pagePathInfo.value![1]
    const page = type === 'pre' ? +pagePathInfo.value![2] - 1 : +pagePathInfo.value![2]! + 1
    const suffix = pagePathInfo.value![3]
    selectedGrammar.value.path = `${preFix}${page}${suffix}`
    imageSrc.value = `${ip}/static/JP${selectedGrammar.value.path}`
  }
}

function toggleBook(book: string) {
  if (storeState.value.activeBookList.includes(book)) {
    storeState.value.activeBookList.splice(storeState.value.activeBookList.indexOf(book), 1)
    bookList.find(item => item.book === book)!.active = false
  }
  else {
    storeState.value.activeBookList.push(book)
    bookList.find(item => item.book === book)!.active = true
  }
}
</script>

<template>
  <div grid="~ lg:cols-2" h-full gap-4 of-hidden px-8>
    <PreviewModal
      v-if="isPreviewModalVisible"
      :img-url="imageSrc"
      @to-pre-page="changePage('pre')"
      @to-next-page="changePage('next')"
      @on-close="() => { isPreviewModalVisible = false }"
    />
    <div h-full grid="~ rows-[min-content_min-content_1fr]" of-hidden>
      <div flex items-center py-4 text-left>
        <Title />
        <ThemeToggle />
        <BookGroup
          :book-list="bookList"
          :toggle-book="toggleBook"
        />
      </div>
      <SearchBar
        :on-search="fetchGrammar"
      />
      <GrammarList
        :book-list="bookList"
        :selected-grammar="selectedGrammar"
        :image-src="imageSrc"
        :on-selected-grammar="selectGrammar"
      />
    </div>

    <ViewSection
      :image-src="imageSrc"
      :change-page="changePage"
    />
  </div>
</template>

<style>
#feedbackList::-webkit-scrollbar {
    display: none;
}
</style>

<router lang="yaml">
meta:
dev:true
</router>
