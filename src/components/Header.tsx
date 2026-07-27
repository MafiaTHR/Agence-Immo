import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import Seal from './Seal';

interface NavItem {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', to: '/' },
  { label: 'Tarifs', to: '/tarifs' },
  {
    label: 'Habitation aménagés',
    to: '/catalogue/habitations-amenagees-petit',
    children: [
      { label: 'Petit', to: '/catalogue/habitations-amenagees-petit' },
      { label: 'Grand', to: '/catalogue/habitations-amenagees-grand' },
    ],
  },
  {
    label: 'Habitation vide',
    to: '/catalogue/habitations-vides-petit',
    children: [
      { label: 'Petit', to: '/catalogue/habitations-vides-petit' },
      { label: 'Moyen', to: '/catalogue/habitations-vides-moyen' },
      { label: 'Grand', to: '/catalogue/habitations-vides-grand' },
    ],
  },
  {
    label: 'Entrepôt, Bunker, Hangar, Bureaux, Garages',
    to: '/catalogue/entrepots',
    children: [
      { label: 'Entrepôts', to: '/catalogue/entrepots' },
      { label: 'Bureaux', to: '/catalogue/bureaux' },
      { label: 'Bunker', to: '/catalogue/bunker' },
      { label: 'Hangar', to: '/catalogue/hangar' },
      { label: 'Garage', to: '/catalogue/garage' },
    ],
  },
  {
    label: 'Construire',
    to: '/catalogue/construction',
    children: [{ label: 'Vos projets', to: '/catalogue/construction' }],
  },
  { label: 'Contact', to: '/contact' },
  { label: 'À propos', to: '/a-propos' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-d8-black/90 backdrop-blur-md border-b border-d8-line' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <NavLink to="/" className="flex items-center gap-3 group">
          <Seal size={36} className="transition-transform duration-300 group-hover:scale-105" />
          <div className="leading-none">
            <div className="font-display text-lg font-bold tracking-wide text-d8-cream">DYNASTY 8</div>
            <div className="text-[10px] uppercase tracking-widest2 text-d8-gold">Immobilier de prestige</div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => item.children && setOpenDropdown(null)}
            >
              <NavLink
                to={item.to ?? '#'}
                className={({ isActive }) =>
                  `flex items-center gap-1 text-sm uppercase tracking-wide transition-colors ${
                    isActive ? 'text-d8-gold' : 'text-d8-cream/85 hover:text-d8-gold'
                  }`
                }
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </NavLink>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full mt-3 w-72 -translate-x-1/2 rounded-sm border border-d8-line bg-d8-charcoal p-2 shadow-gold"
                  >
                    {item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block rounded-sm px-4 py-2.5 text-sm transition-colors ${
                            isActive ? 'bg-d8-panel text-d8-gold' : 'text-d8-cream/80 hover:bg-d8-panel hover:text-d8-gold'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <button
          className="p-2 text-d8-cream lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-d8-black/98 backdrop-blur-sm lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <Seal size={32} />
                <span className="font-display text-lg font-bold text-d8-cream">DYNASTY 8</span>
              </div>
              <button className="p-2 text-d8-cream" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu">
                <X size={26} />
              </button>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-1 px-5 py-6"
            >
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-d8-line py-3">
                  <NavLink
                    to={item.to ?? '#'}
                    onClick={() => !item.children && setMobileOpen(false)}
                    className="font-display text-xl text-d8-cream"
                  >
                    {item.label}
                  </NavLink>
                  {item.children && (
                    <div className="mt-3 flex flex-col gap-2 pl-3">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setMobileOpen(false)}
                          className="text-sm text-d8-cream/70 hover:text-d8-gold"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
