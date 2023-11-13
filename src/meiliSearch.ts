import { MeiliSearch } from 'meilisearch'

export const client = new MeiliSearch({
  host: import.meta.env.VITE_MEILI_IP,
  apiKey: import.meta.env.VITE_KEY,
})
