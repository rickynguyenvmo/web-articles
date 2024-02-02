import { Button } from '@/components'
import { useFormActionContext, useFormSubmitContext } from '../form-context'

export const SubmitButton = () => {
  const { submitForm } = useFormActionContext()
  const { isSubmitting } = useFormSubmitContext()

  return (
    <Button onClick={submitForm} disabled={isSubmitting}>
      Submit
    </Button>
  )
}
