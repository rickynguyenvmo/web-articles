import { TextField } from '@/components'
import {
  useFormActionContext,
  useFormCreatedAtContext,
  useFormSubmitContext
} from '../form-context'
import { format } from 'date-fns'

type CreatedAtInputProps = {
  wrapperClassName?: string
  defaultValue?: number
}

export const CreatedAtInput = (props: CreatedAtInputProps) => {
  const { value, error } = useFormCreatedAtContext()
  const { setFieldValue } = useFormActionContext()
  const { submitCount, isSubmitting } = useFormSubmitContext()

  const getDefaultValue = () => {
    if (!props.defaultValue && !value) {
      return undefined
    }
    return format(
      new Date(props.defaultValue || value),
      'yyyy-MM-dd hh:mm'
    ).replaceAll(' ', 'T')
  }

  return (
    <TextField
      wrapperClassName={props.wrapperClassName}
      name="createdAt"
      label="Publishing date"
      type="datetime-local"
      defaultValue={getDefaultValue()}
      errorText={submitCount >= 1 ? error : undefined}
      onChange={(e) => {
        if (e.currentTarget.value) {
          const selectedTime = new Date(e.currentTarget.value)
          setFieldValue('createdAt', selectedTime.getTime())
        } else {
          setFieldValue('createdAt', undefined)
        }
      }}
      disabled={isSubmitting}
      required
    />
  )
}
