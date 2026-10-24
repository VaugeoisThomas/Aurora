import { useId } from 'react'
import type { ReactNode } from 'react'
import Button from '../../components/ui/Button'
import FormFeedback from '../../components/feedback/FormFeedback'

type AuthFormProps = {
  title: string
  submitLabel: string
  pendingLabel: string
  isSubmitting: boolean
  errorMessage?: string
  successMessage?: string
  onSubmit: () => Promise<void>
  children: ReactNode
}

/**
 * Partage la structure des formulaires d'authentification.
 * @param props - Titre, champs, messages, et action de soumission.
 * @returns Un formulaire avec ses messages et son bouton de soumission.
 */
export default function AuthForm({
  title,
  submitLabel,
  pendingLabel,
  isSubmitting,
  errorMessage,
  successMessage,
  onSubmit,
  children,
}: Readonly<AuthFormProps>) {
  const titleId = useId()

  return (
    <form
      className="auth-form"
      aria-labelledby={titleId}
      aria-busy={isSubmitting}
      onSubmit={(event) => {
        event.preventDefault()
        void onSubmit()
      }}
    >
      <h2 id={titleId}>{title}</h2>

      {children}

      <FormFeedback
        errorMessage={errorMessage}
        successMessage={successMessage}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? pendingLabel : submitLabel}
      </Button>
    </form>
  )
}
