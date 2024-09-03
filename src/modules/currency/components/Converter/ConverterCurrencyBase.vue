<script setup lang="ts">
import type { Currency } from '../../types.ts'
import Input from '../../../../components/form/Input.vue'
import ConverterCurrencySelect from './ConverterCurrencySelect.vue'

defineProps<{
  currencies: Currency[]
}>()

const currency = defineModel<string>()
const currencyAmount = defineModel<number>('amount', {
  default: 0
})
</script>

<template>
  <div class="flex items-center gap-4">
    <ConverterCurrencySelect v-model="currency" :currencies="currencies" />
    <Input v-model="currencyAmount" class="w-20 text-center" min="0" />
  </div>
</template>