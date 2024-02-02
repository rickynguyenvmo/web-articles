import { Button, Container, DeleteArticleButton } from '@/components'
import { useNavigate, useParams } from 'react-router-dom'
import { withFormContext } from './form-context'
import {
  AuthorInput,
  CreatedAtInput,
  SummaryInput,
  TitleInput,
  SubmitButton
} from './input-elements'

export const ArticleEditor = withFormContext(() => {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <Container className="py-6">
      <h1 className="mb-3 text-2xl font-semibold">
        {id ? 'Edit article' : 'Add article'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <TitleInput wrapperClassName="md:col-span-2" />
        <AuthorInput />
        <CreatedAtInput />
        <SummaryInput wrapperClassName="md:col-span-2" />
      </div>
      <div className="mt-2 flex justify-end space-x-2">
        {id ? (
          <DeleteArticleButton articleId={id} onDelete={() => navigate('/')}>
            <Button color="red">Delete</Button>
          </DeleteArticleButton>
        ) : (
          <></>
        )}
        <SubmitButton />
      </div>
    </Container>
  )
})
