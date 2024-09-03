<script setup lang="ts">
import { computed } from 'vue'
import type { CurrencyCodes } from '../../types.ts'

const props = defineProps<{
  amount: number,
  outputCurrency: CurrencyCodes
}>()

const getAmount = computed(() => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: props.outputCurrency })
    .format(props.amount)
})
</script>

<template>
  <div class="w-40 truncate h-11 bg-slate-100 flex items-center justify-center rounded-2xl">
    {{ getAmount }}
  </div>
</template>