<script setup lang="ts">

</script>

<template>
  <div :class="[isDark ? 'i-carbon-sun' : 'i-carbon-moon']" hover="rotate-180" ml-3 cursor-pointer transition duration-500 lg:ml-5 @click="toggleDark()" />
</template>

<style scoped>

</style>
