import { useFormik } from 'formik'
import { articleSchema } from './article-schema'
import React from 'react'
import {
  FormActionContextValue,
  FormSubmitStateContextValue,
  FormValueContextValue
} from './context-type'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { Article, CreatingArticleDTO } from '@/types/article.type'
import { articleService } from '@/services'
import { NO_CACHE_TIME, RETRY_TIMES } from '@/common'
import { SpinIcon } from '@/components'
import { toast } from 'react-toastify'

const initialActions: FormActionContextValue = {
  handleChange: () => undefined,
  handleBlur: () => undefined,
  submitForm: () => Promise.resolve(),
  handleSubmit: () => undefined,
  setFieldValue: () => Promise.resolve()
}

const FormActionContext =
  React.createContext<FormActionContextValue>(initialActions)

export const useFormActionContext = () => {
  return React.useContext(FormActionContext)
}

const FormTitleContext = React.createContext<FormValueContextValue<string>>({
  value: ''
})

export const useFormTitleContext = () => {
  return React.useContext(FormTitleContext)
}

const FormAuthorContext = React.createContext<FormValueContextValue<string>>({
  value: ''
})

export const useFormAuthorContext = () => {
  return React.useContext(FormAuthorContext)
}

const FormSummaryContext = React.createContext<FormValueContextValue<string>>({
  value: ''
})

export const useFormSummaryContext = () => {
  return React.useContext(FormSummaryContext)
}

const FormCreatedAtContext = React.createContext<FormValueContextValue<number>>(
  {
    value: new Date().getTime()
  }
)

export const useFormCreatedAtContext = () => {
  return React.useContext(FormCreatedAtContext)
}

const FormSubmitContext = React.createContext<FormSubmitStateContextValue>({
  submitCount: 0,
  isSubmitting: false
})

export const useFormSubmitContext = () => {
  return React.useContext(FormSubmitContext)
}

const FormProvider = ({ children }: { children?: React.ReactNode }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { mutate: create, isLoading: isCreating } = useMutation(
    (article: CreatingArticleDTO) => articleService.createArticle(article),
    {
      onSuccess: (response) => {
        setFieldValue('title', '')
        setFieldValue('author', '')
        setFieldValue('summary', '')
        setFieldValue('createdAt', new Date().getTime())
        toast(
          <div>
            Create article successfully! Click{' '}
            <Link
              to={`/edit/${response.data.id}`}
              className="font-semibold text-sky-500"
            >
              here
            </Link>{' '}
            to view created article!
          </div>,
          { type: 'success' }
        )
      },
      onError: () => {
        toast('Fail to create article. Please try again!', { type: 'error' })
      }
    }
  )

  const { mutate: update, isLoading: isUpdating } = useMutation(
    (article: Article) => articleService.updateArticle(article),
    {
      onSuccess: () => {
        toast('Update article successfully!', { type: 'success' })
      },
      onError: () => {
        toast('Fail to update article. Please try again!', { type: 'error' })
      }
    }
  )

  const {
    values,
    errors,
    submitCount,
    handleChange,
    handleBlur,
    submitForm,
    handleSubmit,
    setFieldValue
  } = useFormik({
    initialValues: {
      title: '',
      author: '',
      summary: '',
      createdAt: new Date().getTime()
    },
    onSubmit: (values) => {
      if (id) {
        return update({ id, ...values })
      } else {
        return create(values)
      }
    },
    validationSchema: articleSchema
  })

  const { isLoading } = useQuery<Article | undefined>(
    'get-article',
    () => articleService.getArticle(id || ''),
    {
      enabled: !!id,
      cacheTime: NO_CACHE_TIME,
      staleTime: NO_CACHE_TIME,
      retry: RETRY_TIMES,
      onSuccess: (data) => {
        if (!data) {
          navigate('/add')
        } else {
          setFieldValue('title', data.title)
          setFieldValue('author', data.author)
          setFieldValue('summary', data.summary)
          setFieldValue('createdAt', data.createdAt)
        }
      },
      onError: () => {
        navigate('/add')
      }
    }
  )

  const actionValue = React.useMemo(
    () => ({
      handleChange,
      handleBlur,
      submitForm,
      handleSubmit,
      setFieldValue
    }),
    []
  )

  const submitStateValue = React.useMemo(
    () => ({
      isSubmitting: isCreating || isCreating,
      submitCount
    }),
    [isCreating, isCreating, submitCount]
  )

  const titleValue = React.useMemo(
    () => ({
      value: values.title,
      error: errors.title
    }),
    [values.title, errors.title]
  )

  const authorValue = React.useMemo(
    () => ({
      value: values.author,
      error: errors.author
    }),
    [values.author, errors.author]
  )

  const summaryValue = React.useMemo(
    () => ({
      value: values.summary,
      error: errors.summary
    }),
    [values.summary, errors.summary]
  )

  const createdAtValue = React.useMemo(
    () => ({
      value: values.createdAt,
      error: errors.createdAt
    }),
    [values.createdAt, errors.createdAt]
  )

  return (
    <FormActionContext.Provider value={actionValue}>
      <FormSubmitContext.Provider value={submitStateValue}>
        <FormTitleContext.Provider value={titleValue}>
          <FormAuthorContext.Provider value={authorValue}>
            <FormSummaryContext.Provider value={summaryValue}>
              <FormCreatedAtContext.Provider value={createdAtValue}>
                {isLoading ? (
                  <div className="h-[50vh] w-full flex items-center justify-center">
                    <SpinIcon className="h-10 w-10 animate-spin text-sky-500" />
                  </div>
                ) : (
                  children
                )}
                {(isCreating || isUpdating) && (
                  <div className="fixed w-full h-full flex items-center justify-center bg-white/30 pointer-events-none z-10">
                    <SpinIcon className="h-10 w-10 animate-spin text-sky-500" />
                  </div>
                )}
              </FormCreatedAtContext.Provider>
            </FormSummaryContext.Provider>
          </FormAuthorContext.Provider>
        </FormTitleContext.Provider>
      </FormSubmitContext.Provider>
    </FormActionContext.Provider>
  )
}

export function withFormContext(Component: React.ComponentType) {
  return (props: React.ComponentProps<typeof Component>) => (
    <FormProvider>
      <Component {...props} />
    </FormProvider>
  )
}
