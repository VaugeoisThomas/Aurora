import { useState, useEffect, useRef } from 'react'

import EmptyState from '../../components/feedback/EmptyState'
import AccountForm from '../accounts/AccountForm'

/**
 * Affiche le tableau de bord et gère l’ouverture du formulaire de compte.
 * @returns L’état vide ou le formulaire selon l’action de l’utilisateur.
 */
export default function Dashboard() {
  const [isAccountFormOpen, setIsAccountFormOpen] = useState(false)
  const addAccountButtonRef = useRef<HTMLButtonElement>(null)
  const wasAccountFormOpen = useRef(false)

  useEffect(() => {
    if (!isAccountFormOpen && wasAccountFormOpen.current) {
      addAccountButtonRef.current?.focus()
    }
    wasAccountFormOpen.current = isAccountFormOpen
  }, [isAccountFormOpen])

  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <h2 id="dashboard-title">Tableau de bord</h2>
      <p>Retrouvez ici une vue d'ensemble de vos finances.</p>

      {isAccountFormOpen ? (
        <AccountForm onCancel={() => setIsAccountFormOpen(false)} />
      ) : (
        <EmptyState
          title="Aucun compte ajouté"
          message="Ajoutez votre premier compte pour commencer à suivre vos finances."
          actionButtonRef={addAccountButtonRef}
          action={{
            label: 'Ajouter un compte',
            onClick: () => setIsAccountFormOpen(true),
          }}
        />
      )}
    </section>
  )
}
