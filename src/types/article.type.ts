export type Article = {
  id: string
  title: string
  author: string
  summary: string
  createdAt: number
}

export type CreatingArticleDTO = {
  title: string
  author: string
  summary: string
  createdAt: number
}

export type ArticlePage = {
  docs: Article[]
  page: number
  limit: number
}
