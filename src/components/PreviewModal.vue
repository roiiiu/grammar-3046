<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps<{
  imgUrl: string
}>()
const emits = defineEmits(['onClose', 'toPrePage', 'toNextPage'])
const { isLoading } = useImage({ src: props.imgUrl! })

const modalRef = ref<HTMLDivElement | null>(null)
const imgRef = ref<HTMLDivElement | null>(null)
const tl = gsap.timeline({ paused: true }).reverse()

watch(isLoading, () => {
  if (!isLoading.value)
    tl.play()
})

onMounted(() => {
  tl.from(modalRef.value, { opacity: 0, duration: 0.2 })
    .fromTo(imgRef.value, { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, '<')
})
</script>

<template>
  <Teleport to="body">
    <div ref="modalRef" flex="~ col" absolute inset-0 bg="black op80" z-99>
      <div flex="~ col" rounded="t-lg" bg="transparent" mt-auto w-full space-y-3>
        <button mr-auto mt-2 text-light @click="emits('onClose')">
          <div i-carbon-close w-8 h-8 />
        </button>
        <div relative rounded-t of-hidden>
          <img ref="imgRef" :src="imgUrl">
          <div flex="~" items-center justify-between>
            <button rounded="tr" w="1/2" py-3 text-gray-200 @click="emits('toPrePage')">
              <div i-carbon-chevron-left m-auto h-7 w-7 />
            </button>
            <button rounded="tl" w="1/2" py-3 text-gray-200 @click="emits('toNextPage')">
              <div i-carbon-chevron-right m-auto h-7 w-7 />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

</style>
