import { FormikErrors } from 'formik'

export type FormActionContextValue = {
  handleBlur: {
    (e: React.FocusEvent<unknown>): void
    <T = unknown>(fieldOrEvent: T): T extends string
      ? (e: unknown) => void
      : void
  }
  handleChange: {
    (e: React.ChangeEvent<unknown>): void
    <T_1 = string | React.ChangeEvent<unknown>>(
      field: T_1
    ): T_1 extends React.ChangeEvent<unknown>
      ? void
      : (e: string | React.ChangeEvent<unknown>) => void
  }
  submitForm: () => Promise<unknown>
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          title: string
          author: string
          summary: string
          createdAt: number
        }>
      >
}

export type FormValueContextValue<T> = {
  value: T
  error?: string
}

export type FormSubmitStateContextValue = {
  submitCount: number
  isSubmitting: boolean
}
