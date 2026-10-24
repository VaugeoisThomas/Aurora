import AppHeader from './components/layout/AppHeader'
import Dashboard from './features/dashboard/Dashboard'
import Button from './components/ui/Button'
import AuthScreen from './features/auth/AuthScreen'
import SignOutButton from './features/auth/SignOutButton'
import { useAuthSession } from './features/auth/useAuthSession'

/**
 * Affiche le contenu adapté au chargement et à la session utilisateur.
 * @returns L'en-tête, puis le chargement, une erreur ou l'écran approprié.
 */
export default function App() {
  const { session, isLoading, errorMessage } = useAuthSession()

  let content

  if (isLoading) {
    content = <p role="status">Chargement de votre session...</p>
  } else if (errorMessage) {
    content = (
      <div>
        <p role="alert">{errorMessage}</p>
        <Button onClick={() => window.location.reload()}>Réessayer</Button>
      </div>
    )
  } else if (session) {
    content = (
      <>
        <SignOutButton />
        <Dashboard />
      </>
    )
  } else {
    content = <AuthScreen />
  }
  return (
    <main className="app">
      <AppHeader />
      {content}
    </main>
  )
}
