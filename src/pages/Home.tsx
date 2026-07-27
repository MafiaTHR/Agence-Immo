import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home as HomeIcon, Warehouse, Building2, Hammer, KeyRound } from 'lucide-react';
import properties from '../data/properties.json';
import { CATEGORIES, type Property } from '../types/property';
import PropertyCard from '../components/PropertyCard';
import PropertyImage from '../components/PropertyImage';

const CATEGORY_ICONS: Record<string, typeof HomeIcon> = {
  'habitations-amenagees-petit': HomeIcon,
  'habitations-amenagees-grand': Building2,
  'habitations-vides-petit': KeyRound,
  'habitations-vides-moyen': KeyRound,
  'habitations-vides-grand': KeyRound,
  entrepots: Warehouse,
  bureaux: Building2,
  bunker: Warehouse,
  hangar: Warehouse,
  garage: Warehouse,
  construction: Hammer,
};

const typedProperties = properties as Property[];

export default function Home() {
  const featured = typedProperties.find((p) => p.slug === '4-integrity-way-apt-30') ?? typedProperties[0];
  const highlights = typedProperties.filter((p) => p.disponible).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-d8-line">
        <div className="absolute inset-0">
          <PropertyImage
            slug={featured.slug}
            index={0}
            fallback={featured.galerie[0]}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-d8-black via-d8-black/85 to-d8-black/40" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-5 py-28 lg:px-10 lg:py-40">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-5"
          >
            Dynasty 8 — Catalogue Immobilier
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl font-display text-4xl font-bold leading-tight text-d8-cream sm:text-5xl lg:text-6xl"
          >
            L'adresse de référence pour l'immobilier d'exception.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-d8-cream/75"
          >
            Habitations aménagées, biens bruts, garages, entrepôts et projets de construction sur mesure.
            Chaque bien du catalogue Dynasty 8 est sélectionné pour sa qualité et son emplacement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              to="/catalogue"
              className="flex items-center gap-2 rounded-sm bg-d8-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-d8-black transition-colors hover:bg-d8-gold-bright"
            >
              Parcourir le catalogue <ArrowRight size={16} />
            </Link>
            <Link
              to={`/bien/${featured.slug}`}
              className="flex items-center gap-2 rounded-sm border border-d8-gold/50 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-d8-gold transition-colors hover:bg-d8-gold/10"
            >
              Bien à la une
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured property */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">À la une</p>
            <h2 className="font-display text-3xl font-bold text-d8-cream">Bien du moment</h2>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="deed-corner overflow-hidden rounded-sm border border-d8-line"
          >
            <PropertyImage
              slug={featured.slug}
              index={0}
              fallback={featured.galerie[0]}
              alt={featured.nom}
              className="h-[420px] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="eyebrow mb-3">{featured.localisation}</p>
            <h3 className="font-display text-3xl font-bold text-d8-cream">{featured.nom}</h3>
            <p className="mt-4 font-mono text-2xl text-d8-gold-bright">{featured.prix.toLocaleString('fr-FR')} $</p>
            <p className="mt-5 leading-relaxed text-d8-cream/75">{featured.description}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2.5 text-sm text-d8-cream/80">
              {featured.caracteristiques.slice(0, 6).map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-d8-gold" /> {c}
                </li>
              ))}
            </ul>
            <Link
              to={`/bien/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-d8-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-d8-black transition-colors hover:bg-d8-gold-bright"
            >
              Voir la fiche complète <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-d8-line bg-d8-charcoal/50">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
          <p className="eyebrow mb-2">Explorer</p>
          <h2 className="mb-10 font-display text-3xl font-bold text-d8-cream">Catégories du catalogue</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.slug] ?? HomeIcon;
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link
                    to={`/catalogue/${cat.slug}`}
                    className="group flex h-full flex-col rounded-sm border border-d8-line bg-d8-panel p-6 transition-all hover:border-d8-gold/60 hover:-translate-y-1"
                  >
                    <Icon size={26} className="mb-4 text-d8-gold" />
                    <h3 className="font-display text-lg font-semibold text-d8-cream group-hover:text-d8-gold">
                      {cat.label}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-d8-cream/65">{cat.description}</p>
                    <span className="mt-4 flex items-center gap-1.5 text-xs uppercase tracking-wide text-d8-gold">
                      Découvrir <ArrowRight size={13} />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights grid */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-2">Sélection</p>
            <h2 className="font-display text-3xl font-bold text-d8-cream">Biens disponibles</h2>
          </div>
          <Link to="/catalogue" className="hidden items-center gap-1.5 text-sm text-d8-gold hover:text-d8-gold-bright sm:flex">
            Tout voir <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
