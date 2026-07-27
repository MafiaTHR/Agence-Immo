import { motion } from 'framer-motion';
import Seal from '../components/Seal';

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 lg:px-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="mb-6 flex items-center gap-4">
          <Seal size={48} />
          <div>
            <p className="eyebrow">Depuis toujours</p>
            <h1 className="font-display text-3xl font-bold text-d8-cream">À propos de Dynasty 8</h1>
          </div>
        </div>

        <p className="leading-relaxed text-d8-cream/80">
          Dynasty 8 est une agence immobilière fictive dédiée à un univers de roleplay, proposant un
          catalogue complet de biens : habitations aménagées, habitations vides, garages, entrepôts et
          projets de construction sur mesure. Chaque fiche présente les caractéristiques du bien, sa
          localisation et son prix, avec un système de commande simplifié pour formaliser une demande
          auprès de notre équipe.
        </p>
        <p className="mt-4 leading-relaxed text-d8-cream/80">
          Ce site est une reproduction indépendante, pensée pour être facilement personnalisable :
          l'ensemble du catalogue est piloté par un simple fichier de données, sans qu'il soit nécessaire
          de toucher au code de l'application pour ajouter ou modifier un bien.
        </p>
      </motion.div>

      <div className="gold-divider my-10" />

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { chiffre: '6', label: 'Catégories de biens' },
          { chiffre: '100%', label: 'Catalogue personnalisable' },
          { chiffre: '24/7', label: 'Commandes via Discord' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-sm border border-d8-line bg-d8-charcoal p-6 text-center">
            <div className="font-display text-3xl font-bold text-d8-gold">{stat.chiffre}</div>
            <div className="mt-1 text-xs uppercase tracking-widest2 text-d8-muted">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
