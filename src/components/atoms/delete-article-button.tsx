import { articleService } from '@/services'
import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import * as Dialog from '@radix-ui/react-dialog'
import { SpinIcon } from '../icons'
import { Button } from './button'

type DeleteArticleButtonProps = {
  articleTitle?: string
  articleId: string
  onDelete?: () => void
  children: React.ReactNode
}

export const DeleteArticleButton = (props: DeleteArticleButtonProps) => {
  const [openDialog, setOpenDialog] = React.useState(false)

  const { mutate: deleteArticle, isLoading: isDeleting } = useMutation(
    () => articleService.deleteArticle(props.articleId),
    {
      onSuccess: () => {
        toast('Delete article successfully!', { type: 'success' })
        setOpenDialog(false)
        props.onDelete?.()
      },
      onError: () => {
        toast('Fail to delete article. Please try again!', { type: 'error' })
      }
    }
  )

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger asChild>{props.children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-x-0 inset-y-0 bg-black/30" />
        <Dialog.Content
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
          onClick={() => {
            if (!isDeleting) {
              setOpenDialog(false)
            }
          }}
        >
          <div
            className="rounded-lg bg-white w-[450px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Dialog.Title className="p-4 text-lg font-medium bg-gray-100">
              Delete article
            </Dialog.Title>
            <Dialog.Description className="px-4 py-2.5">
              Are you sure to delete{' '}
              <span className="font-medium">
                {props.articleTitle || 'this article'}
              </span>
              ?
            </Dialog.Description>
            <div className="p-4 flex justify-end border-t border-gray-100 space-x-2">
              <Button
                variant="outline"
                color="gray"
                onClick={() => setOpenDialog(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => deleteArticle()}
                className="min-w-16"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <SpinIcon className="text-white animate-spin" />
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
