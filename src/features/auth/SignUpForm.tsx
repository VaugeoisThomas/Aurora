import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import AuthForm from './AuthForm'
import TextField from '../../components/ui/TextField'
import { useAsyncAction } from '../../hooks/useAsyncAction'

/**
 * Gére l'inscription par email et mot de passe avec Supabase.
 * @returns Le formulaire et les messages d'attente, d'erreur ou de confirmation.
 */

export default function SignUpForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [confirmationError, setConfirmationError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const { isSubmitting, errorMessage, runAction, clearError } = useAsyncAction()

  /**
   * Vérifie les mots de passe puis demande une inscription.
   * @returns Une promesse ; distingue confirmation d'email et session reçue.
   */
  async function handleSignUp() {
    if (isSubmitting) return

    setConfirmationError('')
    setSuccessMessage('')
    clearError()

    if (password !== passwordConfirmation) {
      setConfirmationError('Les deux mots de passe ne correspondent pas.')
      return
    }

    await runAction(async () => {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })
      if (error) {
        return 'Inscription impossible. Vérifiez vos informations ou réessayez plus tard.'
      }

      setPassword('')
      setPasswordConfirmation('')

      if (!data.session) {
        setSuccessMessage(
          'Si votre inscription nécessite une confirmation, consultez votre boîte email et vos courriers indésirables.',
        )
      }

      return null
    }, "La demande a été interrompue. Son résultat n'a pas pu être confirmé ; vérifiez votre boîte email avant de réessayer.")
  }

  return (
    <AuthForm
      title="Créer un compte"
      submitLabel="Créer un compte"
      pendingLabel="Inscription en cours…"
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      successMessage={successMessage}
      onSubmit={handleSignUp}
    >
      <TextField
        label="Adresse email"
        name="email"
        type="email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setSuccessMessage('')
        }}
        disabled={isSubmitting}
      />
      <TextField
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setConfirmationError('')
          setSuccessMessage('')
        }}
        disabled={isSubmitting}
      />
      <TextField
        label="Confirmer le mot de passe"
        name="passwordConfirmation"
        type="password"
        autoComplete="new-password"
        required
        value={passwordConfirmation}
        onChange={(e) => {
          setPasswordConfirmation(e.target.value)
          setConfirmationError('')
          setSuccessMessage('')
        }}
        error={confirmationError}
        disabled={isSubmitting}
      />
    </AuthForm>
  )
}
