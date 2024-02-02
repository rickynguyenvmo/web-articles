import React from 'react'
import { DD_MM_YYYY_HH_MM } from '@/common'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { DeleteArticleButton } from './delete-article-button'
import { TrashIcon } from '../icons'

type ArticleProps = {
  id: string
  title: string
  author: string
  summary: string
  createdAt: number
  onDelete?: () => void
}

export const Article = (props: ArticleProps) => {
  const navigate = useNavigate()

  return (
    <div
      title="Click to update article"
      className="p-4 flex flex-col rounded-md shadow bg-white cursor-pointer transition-all hover:-translate-y-2"
      onClick={() => {
        navigate(`/edit/${props.id}`)
      }}
    >
      <div className="pb-0.5 flex justify-between items-center border-b border-sky-500">
        <h2 className="text-lg font-medium truncate">{props.title}</h2>
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <DeleteArticleButton
            articleTitle={props.title}
            articleId={props.id}
            onDelete={props.onDelete}
          >
            <div title="Delete article">
              <TrashIcon className="text-gray-500 transition-colors hover:text-red-500" />
            </div>
          </DeleteArticleButton>
        </div>
      </div>
      <div className="mt-2 flex-1 text-sm line-clamp-5">{props.summary}</div>
      <div className="mt-3 flex justify-end text-xs text-gray-600">
        {props.author} · {format(new Date(props.createdAt), DD_MM_YYYY_HH_MM)}
      </div>
    </div>
  )
}
