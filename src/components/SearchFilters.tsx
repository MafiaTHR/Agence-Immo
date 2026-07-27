import { Search } from 'lucide-react';
import { CATEGORIES, type PropertyCategory } from '../types/property';

export type SortOption = 'alpha-asc' | 'alpha-desc' | 'prix-asc' | 'prix-desc' | 'disponibilite';

export interface FiltersState {
  query: string;
  categorie: PropertyCategory | 'toutes';
  prixMax: number;
  sort: SortOption;
}

interface SearchFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  showCategoryFilter?: boolean;
  maxPrice: number;
}

const SORT_LABELS: Record<SortOption, string> = {
  'alpha-asc': 'Nom (A → Z)',
  'alpha-desc': 'Nom (Z → A)',
  'prix-asc': 'Prix croissant',
  'prix-desc': 'Prix décroissant',
  disponibilite: 'Disponibilité',
};

export default function SearchFilters({ filters, onChange, showCategoryFilter = true, maxPrice }: SearchFiltersProps) {
  return (
    <div className="rounded-sm border border-d8-line bg-d8-charcoal p-5">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-4">
          <label htmlFor="search-query" className="eyebrow mb-2 block">
            Rechercher
          </label>
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-d8-muted" />
            <input
              id="search-query"
              type="text"
              value={filters.query}
              onChange={(e) => onChange({ ...filters, query: e.target.value })}
              placeholder="Nom, localisation..."
              className="w-full rounded-sm border border-d8-line bg-d8-black py-2.5 pl-9 pr-3 text-sm text-d8-cream placeholder:text-d8-muted focus:border-d8-gold"
            />
          </div>
        </div>

        {showCategoryFilter && (
          <div className="lg:col-span-3">
            <label htmlFor="filter-category" className="eyebrow mb-2 block">
              Catégorie
            </label>
            <select
              id="filter-category"
              value={filters.categorie}
              onChange={(e) => onChange({ ...filters, categorie: e.target.value as FiltersState['categorie'] })}
              className="w-full rounded-sm border border-d8-line bg-d8-black py-2.5 px-3 text-sm text-d8-cream focus:border-d8-gold"
            >
              <option value="toutes">Toutes les catégories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.group} — {cat.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={showCategoryFilter ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <label htmlFor="filter-price" className="eyebrow mb-2 block">
            Prix maximum : <span className="text-d8-gold-bright font-mono">{filters.prixMax.toLocaleString('fr-FR')} $</span>
          </label>
          <input
            id="filter-price"
            type="range"
            min={0}
            max={maxPrice}
            step={5000}
            value={filters.prixMax}
            onChange={(e) => onChange({ ...filters, prixMax: Number(e.target.value) })}
            className="w-full accent-d8-gold"
          />
        </div>

        <div className={showCategoryFilter ? 'lg:col-span-2' : 'lg:col-span-4'}>
          <label htmlFor="filter-sort" className="eyebrow mb-2 block">
            Trier par
          </label>
          <select
            id="filter-sort"
            value={filters.sort}
            onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOption })}
            className="w-full rounded-sm border border-d8-line bg-d8-black py-2.5 px-3 text-sm text-d8-cream focus:border-d8-gold"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
