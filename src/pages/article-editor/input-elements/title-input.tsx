import { TextField } from '@/components'
import {
  useFormActionContext,
  useFormSubmitContext,
  useFormTitleContext
} from '../form-context'

type TitleInputProps = {
  wrapperClassName?: string
  defaultValue?: string
}

export const TitleInput = (props: TitleInputProps) => {
  const { value, error } = useFormTitleContext()
  const { handleChange } = useFormActionContext()
  const { submitCount, isSubmitting } = useFormSubmitContext()

  return (
    <TextField
      wrapperClassName={props.wrapperClassName}
      name="title"
      label="Title"
      placeholder="Type article's title"
      defaultValue={props.defaultValue}
      value={value}
      errorText={submitCount >= 1 ? error : undefined}
      onChange={handleChange}
      disabled={isSubmitting}
      required
    />
  )
}
