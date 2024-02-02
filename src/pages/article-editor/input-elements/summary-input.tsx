import { Textarea } from '@/components'
import {
  useFormActionContext,
  useFormSubmitContext,
  useFormSummaryContext
} from '../form-context'

type SumamryInputProps = {
  wrapperClassName?: string
  defaultValue?: string
}

export const SummaryInput = (props: SumamryInputProps) => {
  const { value, error } = useFormSummaryContext()
  const { handleChange } = useFormActionContext()
  const { submitCount, isSubmitting } = useFormSubmitContext()

  return (
    <Textarea
      wrapperClassName={props.wrapperClassName}
      name="summary"
      label="Summary"
      placeholder="Type article's summary"
      defaultValue={props.defaultValue}
      value={value}
      errorText={submitCount >= 1 ? error : undefined}
      onChange={handleChange}
      disabled={isSubmitting}
      required
    />
  )
}
