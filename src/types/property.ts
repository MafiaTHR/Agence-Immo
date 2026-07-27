export type PropertyCategory =
  | 'habitations-amenagees-petit'
  | 'habitations-amenagees-grand'
  | 'habitations-vides-petit'
  | 'habitations-vides-moyen'
  | 'habitations-vides-grand'
  | 'entrepots'
  | 'bureaux'
  | 'bunker'
  | 'hangar'
  | 'garage'
  | 'construction';

export interface Property {
  id: string;
  slug: string;
  nom: string;
  prix: number;
  categorie: PropertyCategory;
  localisation: string;
  description: string;
  caracteristiques: string[];
  galerie: string[];
  disponible: boolean;
}

export interface CategoryMeta {
  slug: PropertyCategory;
  label: string;
  group: string;
  description: string;
}

/**
 * Regroupement des catégories tel que dans la navigation du site d'origine :
 * Habitation aménagés (Petit/Grand), Habitation vide (Petit/Moyen/Grand),
 * Entrepôt/Bunker/Hangar/Bureaux/Garages, et Construire.
 */
export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'habitations-amenagees-petit',
    label: 'Petit',
    group: 'Habitation aménagés',
    description: 'Habitations aménagées de petite superficie, idéales pour un premier investissement.',
  },
  {
    slug: 'habitations-amenagees-grand',
    label: 'Grand',
    group: 'Habitation aménagés',
    description: 'Habitations aménagées de grand standing, pour une clientèle exigeante.',
  },
  {
    slug: 'habitations-vides-petit',
    label: 'Petit',
    group: 'Habitation vide',
    description: 'Structures vides de petite taille, à aménager selon vos envies.',
  },
  {
    slug: 'habitations-vides-moyen',
    label: 'Moyen',
    group: 'Habitation vide',
    description: 'Structures vides de taille intermédiaire, pour un projet personnalisé.',
  },
  {
    slug: 'habitations-vides-grand',
    label: 'Grand',
    group: 'Habitation vide',
    description: 'Grandes structures brutes, livrées sans aménagement intérieur.',
  },
  {
    slug: 'entrepots',
    label: 'Entrepôts',
    group: 'Entrepôt, Bunker, Hangar, Bureaux, Garages',
    description: 'Entrepôts de stockage adaptés à toutes les activités.',
  },
  {
    slug: 'bureaux',
    label: 'Bureaux',
    group: 'Entrepôt, Bunker, Hangar, Bureaux, Garages',
    description: 'Locaux professionnels et immeubles de bureaux.',
  },
  {
    slug: 'bunker',
    label: 'Bunker',
    group: 'Entrepôt, Bunker, Hangar, Bureaux, Garages',
    description: 'Bunkers sécurisés à usage spécial.',
  },
  {
    slug: 'hangar',
    label: 'Hangar',
    group: 'Entrepôt, Bunker, Hangar, Bureaux, Garages',
    description: 'Hangars de grande capacité pour le stockage ou les véhicules.',
  },
  {
    slug: 'garage',
    label: 'Garage',
    group: 'Entrepôt, Bunker, Hangar, Bureaux, Garages',
    description: 'Garages sécurisés pour le stockage de vos véhicules.',
  },
  {
    slug: 'construction',
    label: 'Vos projets',
    group: 'Construire',
    description: 'Projets de construction sur mesure, avec intérieurs personnalisables.',
  },
];

export function categoryLabel(cat: PropertyCategory): string {
  const meta = CATEGORIES.find((c) => c.slug === cat);
  return meta ? `${meta.group} — ${meta.label}` : cat;
}

export function categoryShortLabel(cat: PropertyCategory): string {
  return CATEGORIES.find((c) => c.slug === cat)?.label ?? cat;
}

