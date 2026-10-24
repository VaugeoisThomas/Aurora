import Button from '../../components/ui/Button'
import FormFeedback from '../../components/feedback/FormFeedback'
import { supabase } from '../../lib/supabase'
import { useAsyncAction } from '../../hooks/useAsyncAction'

/**
 * Permet de fermer la session du navigateur courant.
 * @returns Le bouton de déconnexion, et une éventuelle erreur.
 */

export default function SignOutButton() {
  const { isSubmitting, errorMessage, runAction } = useAsyncAction()

  /**
   * Demande la fermeture de la session du navigateur courant.
   * @returns Une promesse ; Le suivi de session actualise l'écran.
   */
  async function handleSignOut() {
    await runAction(async () => {
      const { error } = await supabase.auth.signOut({
        scope: 'local',
      })
      return error ? 'Déconnexion impossible. Réessayez.' : null
    }, 'La déconnexion a été interrompue. Réessayez.')
  }

  return (
    <div aria-busy={isSubmitting}>
      <FormFeedback errorMessage={errorMessage} />

      <Button onClick={() => void handleSignOut()} disabled={isSubmitting}>
        {isSubmitting ? 'Déconnexion en cours...' : 'Se déconnecter'}
      </Button>
    </div>
  )
}
