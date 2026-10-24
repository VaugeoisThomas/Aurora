import { useState } from 'react'
import AuthForm from './AuthForm'
import TextField from '../../components/ui/TextField'
import { supabase } from '../../lib/supabase'
import { useAsyncAction } from '../../hooks/useAsyncAction'

/**
 * Permet de choisir un nouveau mot de passe après récupération
 * @returns Le formulaire et les messages de validation ou de résultat.
 */
export default function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [confirmationError, setConfirmationError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { isSubmitting, errorMessage, runAction, clearError } = useAsyncAction()

  /**
   *  Vérifie les saisies et demande la modification du mot de passe.
   * @returns Une promesse ; confirme uniquement une modification acceptée.
   */
  async function handleResetPassword() {
    if (isSubmitting) return

    setConfirmationError('')
    setSuccessMessage('')
    clearError()

    if (password !== passwordConfirmation) {
      setConfirmationError('Les mots de passe ne correspondent pas.')
      return
    }

    await runAction(async () => {
      const { data, error } = await supabase.auth.updateUser({
        password,
      })

      if (error || !data.user) {
        return 'Modification impossible. Vérifiez les exigences du mot de passe et la validité du lien.'
      }

      setPassword('')
      setPasswordConfirmation('')
      setSuccessMessage('Votre mot de passe a été modifié.')

      return null
    }, "La modification n'a pas pu être confirmée. Vérifiez votre connexion avant de réessayer.")
  }

  return (
    <AuthForm
      title="Nouveau mot de passe"
      submitLabel="Enregistrer le mot de passe"
      pendingLabel="Enregistrement en cours..."
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      successMessage={successMessage}
      onSubmit={handleResetPassword}
    >
      <TextField
        label="Nouveau mot de passe"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        disabled={isSubmitting}
        onChange={(e) => {
          setPassword(e.target.value)
          setConfirmationError('')
          setSuccessMessage('')
        }}
      />
      <TextField
        label="Confirmer le nouveau mot de passe"
        name="passwordConfirmation"
        type="password"
        autoComplete="new-password"
        required
        value={passwordConfirmation}
        disabled={isSubmitting}
        onChange={(e) => {
          setPasswordConfirmation(e.target.value)
          setConfirmationError('')
          setSuccessMessage('')
        }}
        error={confirmationError}
      />
    </AuthForm>
  )
}
