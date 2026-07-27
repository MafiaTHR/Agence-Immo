import { Link } from 'react-router-dom';
import Seal from '../components/Seal';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center">
      <Seal size={48} className="mb-6 opacity-70" />
      <h1 className="font-display text-5xl font-bold text-d8-cream">404</h1>
      <p className="mt-3 text-d8-cream/70">Ce bien ou cette page n'existe pas dans notre catalogue.</p>
      <Link
        to="/"
        className="mt-8 rounded-sm bg-d8-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-d8-black hover:bg-d8-gold-bright"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
