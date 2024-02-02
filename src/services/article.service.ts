import { API_ENDPOINT, API_V1, DEFAULT_LIMIT } from '@/common'
import { Article, ArticlePage, CreatingArticleDTO } from '@/types/article.type'
import axios from 'axios'

const ARTICLE_ENDPOINT = API_ENDPOINT + API_V1 + '/articles'

const getArticles = async (
  page = 1,
  limit = DEFAULT_LIMIT
): Promise<ArticlePage | undefined> => {
  try {
    const searchParams = new URLSearchParams()
    searchParams.append('page', String(page))
    searchParams.append('limit', String(limit))
    const response = await axios.get<Article[]>(
      `${ARTICLE_ENDPOINT}?${searchParams.toString()}`
    )
    const docs = response.data || []
    if (docs.length === 0) {
      return
    }
    return {
      docs,
      page,
      limit
    }
  } catch (error) {
    console.error(error)
  }
}

const createArticle = (article: CreatingArticleDTO) => {
  return axios.post<Article>(ARTICLE_ENDPOINT, article)
}

const updateArticle = (article: Article) => {
  return axios.put<Article>(`${ARTICLE_ENDPOINT}/${article.id}`, article)
}

const getArticle = async (id: string) => {
  try {
    const response = await axios.get<Article>(`${ARTICLE_ENDPOINT}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const deleteArticle = async (id: string) => {
  try {
    const response = await axios.delete<Article>(`${ARTICLE_ENDPOINT}/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export default {
  getArticles,
  deleteArticle,
  createArticle,
  updateArticle,
  getArticle
}
