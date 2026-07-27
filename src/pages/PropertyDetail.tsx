import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, CheckCircle2, XCircle } from 'lucide-react';
import propertiesData from '../data/properties.json';
import { categoryLabel, categoryShortLabel, type Property } from '../types/property';
import OrderModal from '../components/OrderModal';
import PropertyImage from '../components/PropertyImage';

const properties = propertiesData as Property[];

export default function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const property = properties.find((p) => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [orderOpen, setOrderOpen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  useEffect(() => {
    if (property) {
      document.title = `${property.nom} — Dynasty 8`;
    }
    return () => {
      document.title = 'Dynasty 8 — Catalogue Immobilier';
    };
  }, [property]);

  if (!property) {
    return <Navigate to="/catalogue" replace />;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
      <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-d8-muted">
        <Link to="/catalogue" className="hover:text-d8-gold">Catalogue</Link>
        <ChevronRight size={12} />
        <Link to={`/catalogue/${property.categorie}`} className="hover:text-d8-gold">
          {categoryShortLabel(property.categorie)}
        </Link>
        <ChevronRight size={12} />
        <span className="text-d8-cream/70">{property.nom}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-5">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="deed-corner overflow-hidden rounded-sm border border-d8-line">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyImage
                  slug={property.slug}
                  index={activeImage}
                  fallback={property.galerie[activeImage]}
                  alt={property.nom}
                  loading="eager"
                  className="h-[420px] w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {property.galerie.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {property.galerie.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden rounded-sm border-2 transition-colors ${
                    activeImage === i ? 'border-d8-gold' : 'border-transparent hover:border-d8-line'
                  }`}
                >
                  <PropertyImage
                    slug={property.slug}
                    index={i}
                    fallback={img}
                    alt=""
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <p className="eyebrow mb-2">{categoryLabel(property.categorie)}</p>
          <h1 className="font-display text-3xl font-bold text-d8-cream">{property.nom}</h1>

          <div className="mt-3 flex items-center gap-1.5 text-sm text-d8-cream/70">
            <MapPin size={15} className="text-d8-gold" /> {property.localisation}
          </div>

          <p className="mt-5 font-mono text-3xl text-d8-gold-bright">{property.prix.toLocaleString('fr-FR')} $</p>

          <div className="mt-3 flex items-center gap-2 text-sm">
            {property.disponible ? (
              <>
                <CheckCircle2 size={16} className="text-green-400" />
                <span className="text-green-400">Disponible</span>
              </>
            ) : (
              <>
                <XCircle size={16} className="text-red-400" />
                <span className="text-red-400">Actuellement indisponible</span>
              </>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-d8-cream/80">{property.description}</p>

          <div className="gold-divider my-6" />

          <h2 className="eyebrow mb-3">Caractéristiques</h2>
          <ul className="grid grid-cols-2 gap-y-2.5 text-sm text-d8-cream/85">
            {property.caracteristiques.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="h-1 w-1 shrink-0 rounded-full bg-d8-gold" /> {c}
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOrderOpen(true)}
            disabled={!property.disponible}
            className="mt-8 w-full rounded-sm bg-d8-gold px-6 py-4 text-sm font-semibold uppercase tracking-widest2 text-d8-black transition-colors hover:bg-d8-gold-bright disabled:cursor-not-allowed disabled:bg-d8-line disabled:text-d8-muted"
          >
            {property.disponible ? 'Commander' : 'Bien indisponible'}
          </button>
        </motion.div>
      </div>

      <OrderModal property={property} open={orderOpen} onClose={() => setOrderOpen(false)} />
    </div>
  );
}
