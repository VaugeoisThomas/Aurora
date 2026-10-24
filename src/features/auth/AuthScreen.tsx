import { useState } from 'react'
import Button from '../../components/ui/Button'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

/**
 * Permet de choisir entre connexion et inscription.
 * @returns Le formulaire choisi et le bouton pour changer de mode.
 */

export default function AuthScreen() {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const isSignIn = mode === 'sign-in'

  return (
    <section>
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <Button onClick={() => setMode(isSignIn ? 'sign-up' : 'sign-in')}>
        {isSignIn ? 'Créer un compte' : 'Déjà inscrit ? Se connecter'}
      </Button>
    </section>
  )
}
