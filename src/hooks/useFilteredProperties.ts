import { useMemo, useState } from 'react';
import type { Property } from '../types/property';
import type { FiltersState } from '../components/SearchFilters';

export function useFilteredProperties(properties: Property[], initialCategorie: FiltersState['categorie'] = 'toutes') {
  const maxPrice = useMemo(
    () => Math.max(...properties.map((p) => p.prix), 100000),
    [properties],
  );

  const [filters, setFilters] = useState<FiltersState>({
    query: '',
    categorie: initialCategorie,
    prixMax: maxPrice,
    sort: 'alpha-asc',
  });

  const results = useMemo(() => {
    const query = filters.query.trim().toLowerCase();

    const filtered = properties.filter((property) => {
      const matchesQuery =
        query.length === 0 ||
        property.nom.toLowerCase().includes(query) ||
        property.localisation.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query);

      const matchesCategory = filters.categorie === 'toutes' || property.categorie === filters.categorie;
      const matchesPrice = property.prix <= filters.prixMax;

      return matchesQuery && matchesCategory && matchesPrice;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sort) {
        case 'alpha-asc':
          return a.nom.localeCompare(b.nom, 'fr');
        case 'alpha-desc':
          return b.nom.localeCompare(a.nom, 'fr');
        case 'prix-asc':
          return a.prix - b.prix;
        case 'prix-desc':
          return b.prix - a.prix;
        case 'disponibilite':
          return Number(b.disponible) - Number(a.disponible);
        default:
          return 0;
      }
    });

    return sorted;
  }, [properties, filters]);

  return { filters, setFilters, results, maxPrice };
}
