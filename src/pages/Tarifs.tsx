import { motion } from 'framer-motion';
import { ImageOff } from 'lucide-react';

interface ZoneMultiplier {
  couleur: string;
  dot: string;
  label: string;
}

const MULTIPLIERS: ZoneMultiplier[] = [
  { couleur: 'Bleu', dot: '#4A90D9', label: 'x1,5 du prix indiqué' },
  { couleur: 'Jaune', dot: '#E0B93C', label: 'x3 du prix indiqué' },
  { couleur: 'Rouge', dot: '#D9445E', label: 'x5 du prix indiqué' },
  { couleur: 'Violet', dot: '#8B5FBF', label: 'x10 du prix indiqué' },
  { couleur: 'Blaine County', dot: '#8C6B6B', label: 'x2 du prix indiqué' },
];

export default function Tarifs() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="eyebrow mb-2">Grille tarifaire</p>
        <h1 className="font-display text-4xl font-bold text-d8-cream">Carte des zones</h1>
      </motion.div>

      {/* Emplacement pour la carte — voir instructions dans le README */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="deed-corner mt-10 overflow-hidden rounded-sm border border-d8-line bg-d8-charcoal"
      >
        <img
          src="/images/carte-zones.jpg"
          alt="Carte des zones tarifaires"
          className="block h-auto w-full object-cover"
          onError={(e) => {
            // Si l'image n'a pas encore été ajoutée dans public/images/,
            // on affiche un emplacement explicite plutôt qu'une icône cassée.
            (e.currentTarget as HTMLImageElement).style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div
          style={{ display: 'none' }}
          className="flex h-80 flex-col items-center justify-center gap-3 px-6 text-center text-d8-muted"
        >
          <ImageOff size={32} className="text-d8-gold/60" />
          <p className="text-sm">
            Ajoutez votre image de carte dans <code className="text-d8-gold">public/images/carte-zones.jpg</code>
            <br />
            pour qu'elle s'affiche automatiquement ici.
          </p>
        </div>
      </motion.div>

      {/* Fonctionnement */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-16 text-center"
      >
        <h2 className="font-display text-2xl font-bold text-d8-cream">Fonctionnement</h2>
        <p className="mx-auto mt-4 max-w-xl text-d8-cream/75">
          Les prix sont basés sur l'intérieur choisi, qui sera multiplié en fonction de la zone du terrain.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
          {MULTIPLIERS.map((m) => (
            <div
              key={m.couleur}
              className="flex items-center justify-center gap-3 rounded-sm border border-d8-line bg-d8-charcoal px-5 py-3"
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full"
                style={{ backgroundColor: m.dot }}
                aria-hidden="true"
              />
              <span className="text-sm text-d8-cream">
                <strong>{m.couleur}</strong> : {m.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="gold-divider my-16" />

      {/* SASP & SAMS */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-display text-2xl font-bold text-d8-cream">SASP &amp; SAMS</h2>
        <div className="mx-auto mt-6 flex max-w-sm items-center justify-center gap-3 rounded-sm border border-d8-line bg-d8-charcoal px-5 py-3">
          <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ backgroundColor: '#4A90D9' }} aria-hidden="true" />
          <span className="text-sm text-d8-cream">
            <strong>Réduction</strong> : 15%
          </span>
        </div>
      </motion.div>

      <div className="gold-divider my-16" />

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="font-display text-2xl font-bold text-d8-cream">Location</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-d8-cream/75">
          Les prix à la location correspondent à un prix de vente divisé par 10 pour le prix à la semaine.
          Toute maison ou tout appartement non payé à temps sera retiré au locataire dans un délai de 48
          heures après échéance.
        </p>
      </motion.div>
    </div>
  );
}
