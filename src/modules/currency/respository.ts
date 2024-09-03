import { useFetch } from '@vueuse/core'
import type { Currencies, CurrencyCodes } from './types.ts'

export class CurrencyRepository {
  private fetch(
    endpoint: string,
    query?: string
  ) {
    let url = `${import.meta.env.VITE_CURRENCY_API}${endpoint}?apikey=${import.meta.env.VITE_CURRENCY_API_KEY}`

    if (query) {
      url += `&${query}`
    }

    return useFetch(url)
  }

  async all() {
    return this.fetch('/currencies', 'currencies=EUR,USD,RUB')
      .get()
      .json<{
        data: Currencies
      }>()
  }

  async exchange(from: CurrencyCodes, to: CurrencyCodes) {
    return this.fetch('/latest', `base_currency=${from}&currencies=${to}`)
      .get()
      .json<{
        data: {
          [key: string]: number
        }
      }>()
  }
}