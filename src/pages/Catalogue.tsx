import { motion } from 'framer-motion';
import propertiesData from '../data/properties.json';
import type { Property } from '../types/property';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import { useFilteredProperties } from '../hooks/useFilteredProperties';

const properties = propertiesData as Property[];

export default function Catalogue() {
  const { filters, setFilters, results, maxPrice } = useFilteredProperties(properties);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow mb-2">Catalogue complet</p>
        <h1 className="font-display text-4xl font-bold text-d8-cream">Tous nos biens</h1>
        <p className="mt-3 max-w-2xl text-d8-cream/70">
          Parcourez l'ensemble du catalogue Dynasty 8 : habitations, garages, entrepôts et projets de construction.
        </p>
      </motion.div>

      <div className="mt-10">
        <SearchFilters filters={filters} onChange={setFilters} maxPrice={maxPrice} />
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
          <p className="text-d8-cream/70">Aucun bien ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
