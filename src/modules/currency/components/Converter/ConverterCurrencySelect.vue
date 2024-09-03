<script setup lang="ts">
import { Currency } from '../../types.ts'
import Select from '../../../../components/form/Select.vue'
import Input from '../../../../components/form/Input.vue'

defineProps<{
  currencies: Currency[]
}>()

const currency = defineModel<string>()
</script>

<template>
  <Select v-model="currency">
    <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
      {{ currency.code }}
    </option>
  </Select>
</template>