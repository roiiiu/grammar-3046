<script setup lang="ts">
import { VERSION } from '~/const'

function navigateToBiliBili() {
  window.open('https://space.bilibili.com/65988295/')
}
</script>

<template>
  <a>
    <h1>
      <span block cursor-pointer font-600 @click="navigateToBiliBili">文法查阅</span>
      <div flex items-center gap="2">
        <span block flex text-sm font-500 op50>Ver {{ VERSION }}
        </span>
      </div>
    </h1>
  </a>
</template>

<style scoped>

</style>
