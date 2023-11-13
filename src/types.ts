export interface Grammar {
  id: number
  title: string
  level: number | null
  path: string
  book: string
}

export interface GrammarResult {
  book: string
  grammar: Grammar[]
}

export interface Book {
  book: string
  name: string
  active: boolean
  color: string
  grammar: Grammar[]
}
