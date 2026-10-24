type FormFeedbackProps = {
  errorMessage?: string
  successMessage?: string
}

/**
 * Affiche les messages généraux d'un formulaire.
 * @param props - Erreur ou confirmation ; l'erreur est prioritaire
 * @returns Le message accessible, ou rien si aucun message n'est fourni.
 */

export default function FormFeedback({
  errorMessage,
  successMessage,
}: Readonly<FormFeedbackProps>) {
  if (errorMessage) {
    return (
      <p className="form-feedback form-feedback--error" role="alert">
        {errorMessage}
      </p>
    )
  }

  if (successMessage) {
    return (
      <output className="form-feedback form-feedback--success">
        {successMessage}
      </output>
    )
  }
  return null
}
