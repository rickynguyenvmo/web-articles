import { TextField } from '@/components'
import {
  useFormActionContext,
  useFormAuthorContext,
  useFormSubmitContext
} from '../form-context'

type AuthorInputProps = {
  wrapperClassName?: string
  defaultValue?: string
}

export const AuthorInput = (props: AuthorInputProps) => {
  const { value, error } = useFormAuthorContext()
  const { handleChange } = useFormActionContext()
  const { submitCount, isSubmitting } = useFormSubmitContext()

  return (
    <TextField
      wrapperClassName={props.wrapperClassName}
      name="author"
      label="Author"
      placeholder="Type article's author"
      defaultValue={props.defaultValue}
      value={value}
      errorText={submitCount >= 1 ? error : undefined}
      onChange={handleChange}
      disabled={isSubmitting}
      required
    />
  )
}
