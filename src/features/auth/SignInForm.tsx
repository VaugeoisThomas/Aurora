import { useState } from 'react'
import AuthForm from './AuthForm'
import TextField from '../../components/ui/TextField'
import { supabase } from '../../lib/supabase'
import { useAsyncAction } from '../../hooks/useAsyncAction'

/** Présente les champs de connexion par email et mot de passe.
 * @returns Le formulaire de connexion ; Gère la connexion par email et mot de passe avec Supabase.
 */
export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isSubmitting, errorMessage, runAction } = useAsyncAction()
  const [isSignedIn, setIsSignedIn] = useState(false)

  /**
   * Demande une connexion Supabase et confirme la présence d'une session.
   * @returns Une promesse; conserve les saisies en cas d'échec.
   */
  async function handleSignIn() {
    await runAction(async () => {
      setIsSignedIn(false)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error || !data.session) {
        return 'Connexion impossible. Vérifiez vos identifiants et la confirmation de votre email.'
      }

      setPassword('')
      setIsSignedIn(true)
      return null
    }, 'Connexion interrompue. Vérifiez votre connexion et réessayez.')
  }

  return (
    <AuthForm
      title="Se connecter"
      submitLabel="Se connecter"
      pendingLabel="Connexion en cours…"
      isSubmitting={isSubmitting}
      errorMessage={errorMessage}
      successMessage={
        isSignedIn
          ? 'Connexion réussie : une session a été établie.'
          : undefined
      }
      onSubmit={handleSignIn}
    >
      <TextField
        label="Adresse email"
        name="email"
        type="email"
        autoComplete="username"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isSubmitting}
      />

      <TextField
        label="Mot de passe"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isSubmitting}
      />
    </AuthForm>
  )
}
