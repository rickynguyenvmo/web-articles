import { CACHE_TIME, RETRY_TIMES } from '@/common'
import {
  Article,
  Button,
  Container,
  InfiniteLoading,
  NoArticleIcon,
  SpinIcon
} from '@/components'

import { articleService } from '@/services'
import { useInfiniteQuery } from 'react-query'
import { Link } from 'react-router-dom'

export const ArticleList = () => {
  const {
    isLoading,
    isRefetching,
    isFetchingNextPage,
    hasNextPage,
    data: articlePages,
    fetchNextPage,
    refetch: reloadArticles
  } = useInfiniteQuery({
    queryKey: 'get-articles',
    queryFn: ({ pageParam = 1 }) => articleService.getArticles(pageParam),
    getNextPageParam: (page) => {
      if (page) {
        return page.page + 1
      }
    },
    cacheTime: CACHE_TIME,
    staleTime: CACHE_TIME,
    retry: RETRY_TIMES,
    refetchOnMount: true
  })

  const articles = articlePages?.pages.flatMap((page) => page?.docs || [])

  return (
    <Container className="py-6">
      <div className="mb-3 flex justify-between">
        <h1 className="text-2xl font-semibold">
          Articles{articles?.length ? ` (${articles.length})` : ''}
        </h1>
        <Button
          className="w-20"
          disabled={isRefetching}
          onClick={() => reloadArticles()}
        >
          {isRefetching ? (
            <SpinIcon className="text-white animate-spin" />
          ) : (
            'Refresh'
          )}
        </Button>
      </div>
      {isLoading ? (
        <div className="h-[50vh] w-full flex items-center justify-center">
          <SpinIcon className="h-10 w-10 animate-spin text-sky-500" />
        </div>
      ) : articles?.length ? (
        <InfiniteLoading
          isFetching={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {articles.map((article) => (
              <Article
                key={article.id}
                id={article.id}
                title={article.title}
                author={article.author}
                summary={article.summary}
                createdAt={article.createdAt}
                onDelete={() => reloadArticles()}
              />
            ))}
          </div>
        </InfiniteLoading>
      ) : (
        <div className="flex items-center justify-center h-[50vh] w-full text-gray-600">
          <div>
            <span>
              <NoArticleIcon className="inline h-10 w-10 mr-1" />
              <span>No articles</span>
            </span>
            <Link to="/add">
              <Button className="mt-3">Add an article</Button>
            </Link>
          </div>
        </div>
      )}
    </Container>
  )
}
