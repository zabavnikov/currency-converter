<script setup lang="ts">
import type { Currency, CurrencyCodes } from '../../types.ts'
import Select from '../../../../components/form/Select.vue'

defineProps<{
  currencies: Currency[]
}>()

const currency = defineModel<CurrencyCodes>()
</script>

<template>
  <Select v-model="currency">
    <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
      {{ currency.code }}
    </option>
  </Select>
</template>