import { useState } from 'react'
import AuthForm from './AuthForm'
import TextField from '../../components/ui/TextField'
import { supabase } from '../../lib/supabase'
import { useAsyncAction } from '../../hooks/useAsyncAction'

/**
 * Présente la demande de récupération du mot de passe.
 * @returns Un formulaire de saisie d'email
 */

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { isSubmitting, errorMessage, runAction } = useAsyncAction()

  /**
   * Demande un lien de récupération sans révéler l'existence du compte.
   * @returns Une promesse ; affiche le résultat de la demande.
   */
  async function handleRequestReset() {
    await runAction(async () => {
      setSuccessMessage('')

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      )

      if (error) {
        if (import.meta.env.DEV) {
          console.error('Récupération du mot de passe :', {
            code: error.code,
            status: error.status,
          })
        }
        return 'Demande impossible pour le moment. Réessayez plus tard.'
      }

      setSuccessMessage(
        'Si un compte correspond à cette adresse, vous recevrez un lien de récupération. Consultez aussi vos courriers indésirables.',
      )
      return null
    }, 'La demande a été interrompue. Vérifiez votre boïte email avant de réessayer.')
  }

  return (
    <AuthForm
      title="Mot de passe oublié"
      submitLabel="Recevoir un lien"
      pendingLabel="Envoi en cours..."
      isSubmitting={isSubmitting}
      onSubmit={handleRequestReset}
      errorMessage={errorMessage}
      successMessage={successMessage}
    >
      <TextField
        label="Adresse email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        disabled={isSubmitting}
        onChange={(e) => {
          setEmail(e.target.value)
          setSuccessMessage('')
        }}
      />
    </AuthForm>
  )
}
