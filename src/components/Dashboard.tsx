import EmptyState from './EmptyState'

export default function Dashboard() {
  return (
    <section className="dashboard" aria-labelledby="dashboard-title">
      <h2 id="dashboard-title">Tableau de bord</h2>
      <p>Retrouvez ici une vue d'ensemble de vos finances.</p>

      <EmptyState
        title="Aucun compte ajouté"
        message="Ajoutez votre premier compte pour commencer à suivre vos finances."
      />
    </section>
  )
}
