<script setup lang="ts">
const model = defineModel<unknown>()
</script>

<template>
  <input
    v-model="model"
    type="number"
    class="bg-white text-blue-500 font-medium border h-11 px-2 rounded-xl"
  >
</template>