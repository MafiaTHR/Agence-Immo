import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import propertiesData from '../data/properties.json';
import { CATEGORIES, type Property, type PropertyCategory } from '../types/property';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import { useFilteredProperties } from '../hooks/useFilteredProperties';

const allProperties = propertiesData as Property[];

export default function CategoryPage() {
  const { categorie } = useParams<{ categorie: string }>();
  const meta = CATEGORIES.find((c) => c.slug === categorie);

  const categoryProperties = allProperties.filter((p) => p.categorie === categorie);
  const { filters, setFilters, results, maxPrice } = useFilteredProperties(
    categoryProperties,
    (categorie as PropertyCategory) ?? 'toutes',
  );

  if (!meta) {
    return <Navigate to="/catalogue" replace />;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-d8-muted">
        <Link to="/catalogue" className="hover:text-d8-gold">Catalogue</Link>
        <ChevronRight size={12} />
        <span className="text-d8-cream/70">{meta.group}</span>
        <ChevronRight size={12} />
        <span className="text-d8-cream/70">{meta.label}</span>
      </nav>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow mb-2">{meta.group}</p>
        <h1 className="font-display text-4xl font-bold text-d8-cream">{meta.label}</h1>
        <p className="mt-3 max-w-2xl text-d8-cream/70">{meta.description}</p>
      </motion.div>

      <div className="mt-10">
        <SearchFilters filters={filters} onChange={setFilters} maxPrice={maxPrice} showCategoryFilter={false} />
      </div>

      <p className="mt-6 text-sm text-d8-muted">
        {results.length} bien{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
      </p>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => (
            <PropertyCard key={p.id} property={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-16 rounded-sm border border-d8-line bg-d8-charcoal py-16 text-center">
          <p className="text-d8-cream/70">Aucun bien disponible dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}
