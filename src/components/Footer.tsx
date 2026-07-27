import { Link } from 'react-router-dom';
import Seal from './Seal';
import { CATEGORIES } from '../types/property';

const GROUPS = Array.from(new Set(CATEGORIES.map((c) => c.group)));

export default function Footer() {
  return (
    <footer className="border-t border-d8-line bg-d8-charcoal">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-4 lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <Seal size={34} />
            <span className="font-display text-lg font-bold text-d8-cream">DYNASTY 8</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-d8-muted">
            Agence immobilière de référence pour l'acquisition de biens d'exception : habitations, garages,
            entrepôts et projets de construction sur mesure.
          </p>
        </div>

        {GROUPS.map((group) => (
          <div key={group}>
            <h3 className="eyebrow mb-4">{group}</h3>
            <ul className="space-y-2.5">
              {CATEGORIES.filter((c) => c.group === group).map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/catalogue/${cat.slug}`} className="text-sm text-d8-cream/75 hover:text-d8-gold">
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="eyebrow mb-4">Contact</h3>
          <ul className="space-y-2.5 text-sm text-d8-cream/75">
            <li>Discord : Dynasty 8 — Immobilier</li>
            <li>Bureau : Downtown, Los Santos</li>
            <li>Disponible 7j/7</li>
          </ul>
        </div>
      </div>

      <div className="gold-divider" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-d8-muted sm:flex-row lg:px-10">
        <span>© {new Date().getFullYear()} Dynasty 8. Tous droits réservés.</span>
        <span>Site de catalogue à but de roleplay — aucune transaction réelle.</span>
      </div>
    </footer>
  );
}
