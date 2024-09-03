<script setup lang="ts">
import type { Currency, CurrencyCodes } from '../../types.ts'
import InputNumber from '../../../../components/form/InputNumber.vue'
import ConverterCurrencySelect from './ConverterCurrencySelect.vue'

defineProps<{
  currencies: Currency[]
}>()

const currency = defineModel<CurrencyCodes>()
const currencyAmount = defineModel<number>('amount', {
  default: 0
})
</script>

<template>
  <div class="flex items-center gap-4">
    <ConverterCurrencySelect v-model="currency" :currencies="currencies" />
    <InputNumber v-model="currencyAmount" class="w-20 text-center" min="0" />
  </div>
</template>