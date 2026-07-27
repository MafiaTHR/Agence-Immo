import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Property } from '../types/property';
import { categoryShortLabel } from '../types/property';
import PropertyImage from './PropertyImage';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
    >
      <Link
        to={`/bien/${property.slug}`}
        className="deed-corner group block overflow-hidden rounded-sm border border-d8-line bg-d8-charcoal transition-all duration-300 hover:border-d8-gold/60 hover:shadow-gold"
      >
        <div className="relative h-56 overflow-hidden">
          <PropertyImage
            slug={property.slug}
            index={0}
            fallback={property.galerie[0]}
            alt={property.nom}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-d8-black/85 via-transparent to-transparent" />

          <span className="absolute left-3 top-3 rounded-sm border border-d8-gold/40 bg-d8-black/70 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-d8-gold backdrop-blur-sm">
            {categoryShortLabel(property.categorie)}
          </span>

          {!property.disponible && (
            <span className="absolute right-3 top-3 rounded-sm bg-d8-black/80 px-2.5 py-1 text-[10px] uppercase tracking-widest2 text-red-400">
              Indisponible
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-xs text-d8-cream/80">
            <MapPin size={13} className="text-d8-gold" />
            {property.localisation}
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-d8-cream transition-colors group-hover:text-d8-gold">
            {property.nom}
          </h3>
          <div className="gold-divider my-3" />
          <div className="flex items-center justify-between">
            <span className="font-mono text-lg text-d8-gold-bright">
              {property.prix.toLocaleString('fr-FR')} $
            </span>
            <span className="text-xs uppercase tracking-wide text-d8-muted transition-colors group-hover:text-d8-gold">
              Voir la fiche →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
