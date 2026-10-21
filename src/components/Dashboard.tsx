export default function Dashboard() {
    return (
        <section className="dashboard" aria-labelledby='dashboard-title'>
            <h2 id="dashboard-title">Tableau de bord</h2>
            <p>Retrouvez ici une vue d'ensemble de vos finances.</p>

            <div className="empty-state">
                <h3>Aucun compte ajouté</h3>
                <p>Ajoutez votre premier compte pour commencer à suivre vos finances.</p>
            </div>
        </section>
    );
}