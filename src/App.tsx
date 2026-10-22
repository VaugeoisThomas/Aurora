import AppHeader from './components/layout/AppHeader'
import Dashboard from './features/dashboard/Dashboard'

/**
 * Assemble l’en-tête et le tableau de bord dans le contenu principal.
 * @returns La structure principale de l’application.
 */
export default function App() {
  return (
    <main className="app">
      <AppHeader />
      <Dashboard />
    </main>
  )
}
