<script setup lang="ts">
const model = defineModel<unknown>()
</script>

<template>
  <select v-model="model" class="bg-white text-blue-500 font-medium border h-11 px-2 rounded-xl">
    <slot />
  </select>
</template>