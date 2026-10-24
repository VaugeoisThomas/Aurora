import { useState } from 'react'
import Button from '../../components/ui/Button'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'

/**
 * Permet de choisir entre connexion, inscription et récupération du mot de passe.
 * @returns Le formulaire choisi et ses boutons de navigation.
 */
export default function AuthScreen() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up' | 'forgot-password'>(
    'sign-in',
  )
  const isSignIn = mode === 'sign-in'

  let form

  if (mode === 'sign-in') {
    form = <SignInForm />
  } else if (mode === 'sign-up') {
    form = <SignUpForm />
  } else {
    form = <ForgotPasswordForm />
  }

  return (
    <section className="auth-screen">
      {form}
      <div className="auth-screen__actions">
        <Button
          onClick={() => setMode(isSignIn ? 'sign-up' : 'sign-in')}
          variant="secondary"
        >
          {isSignIn ? 'Créer un compte' : 'Retour à la connexion'}
        </Button>
        {isSignIn && (
          <Button
            onClick={() => setMode('forgot-password')}
            variant="secondary"
          >
            Mot de passe oublié ?
          </Button>
        )}
      </div>
    </section>
  )
}
