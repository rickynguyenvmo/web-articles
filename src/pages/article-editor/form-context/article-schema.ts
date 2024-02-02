import { REGEX_CONTAIN_NUMBER_OR_ALPHABET } from '@/common'
import { number, object, string } from 'yup'

export const articleSchema = object({
  title: string()
    .trim()
    .required('Title is required.')
    .matches(REGEX_CONTAIN_NUMBER_OR_ALPHABET, {
      message: "Title can't be fully in special characters."
    }),
  author: string()
    .trim()
    .required("Author's name is required.")
    .matches(REGEX_CONTAIN_NUMBER_OR_ALPHABET, {
      message: "Author's name can't be fully in special characters."
    }),
  summary: string()
    .trim()
    .required('Summary is required.')
    .matches(REGEX_CONTAIN_NUMBER_OR_ALPHABET, {
      message: "Summary can't be fully in special characters."
    }),
  createdAt: number().required('Publishing time is required.')
})
