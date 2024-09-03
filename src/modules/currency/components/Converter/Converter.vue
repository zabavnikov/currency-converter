<script setup lang="ts">
import ConverterCurrencyBase from './ConverterCurrencyBase.vue'
import ConverterCurrencySelect from './ConverterCurrencySelect.vue'
import ConverterSwapButton from './ConverterSwapButton.vue'
import ConverterResult from './ConverterResult.vue'
import { CurrencyRepository } from '../../respository.ts'
import { ref, shallowRef } from 'vue'
import { watchDebounced } from '@vueuse/core'
import getLocalCurrency from '../../../../utils/getLocalCurrency.ts'
import type { Currency, CurrencyCodes } from '../../types.ts'

const currencyRepository = new CurrencyRepository()
const currencies = ref<Currency[]>([])
const result = shallowRef(0)

const baseCurrency = shallowRef<CurrencyCodes>(getLocalCurrency())
const baseCurrencyAmount = shallowRef(0)
const outputCurrency = shallowRef<CurrencyCodes>('USD')

const doSwapCurrency = () => {
  const saveOutput = outputCurrency.value
  outputCurrency.value = baseCurrency.value
  baseCurrency.value = saveOutput
}

currencyRepository.all()
  .then(({ data }) => {
    if (data.value?.data) {
      for (const currency in data.value.data) {
        currencies.value.push(data.value.data[currency])
      }
    }
  })

watchDebounced(() => [
  baseCurrency.value,
  outputCurrency.value,
  baseCurrencyAmount.value,
], ([ from, to, amount ]) => {
  currencyRepository.exchange(from, to)
    .then(({ data }) => {
      if (data.value?.data) {
        result.value = data.value.data[to] * amount
      }
    })
}, {
  debounce: 250
})
</script>

<template>
  <div class="p-6 min-w-96 bg-white rounded-2xl shadow-2xl">
    <h1 class="mb-8 text-center text-2xl">Конвертер валют</h1>

    <div class="flex items-center gap-4">
      <ConverterCurrencyBase
        v-model="baseCurrency"
        v-model:amount="baseCurrencyAmount"
        :currencies="currencies"
      />

      <ConverterSwapButton @click="doSwapCurrency" />

      <ConverterCurrencySelect
        v-model="outputCurrency"
        :currencies="currencies"
      />
      <ConverterResult
        :amount="result"
        :output-currency="outputCurrency"
      />
    </div>
  </div>
</template>