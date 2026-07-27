import { useEffect, useState } from 'react';

interface PropertyImageProps {
  slug: string;
  index: number;
  fallback?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Affiche automatiquement une photo locale si elle existe
 * (public/images/biens/{slug}-{index+1}.jpg|jpeg|png|webp), sinon retombe
 * sur la photo de stock définie dans properties.json.
 *
 * Pour remplacer une photo : déposez un fichier nommé exactement
 * "{slug}-1.jpg" (ou -2, -3...) dans public/images/biens/ — aucune
 * modification de code ni de properties.json n'est nécessaire.
 */
const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

export default function PropertyImage({ slug, index, fallback, alt, className, loading = 'lazy' }: PropertyImageProps) {
  const candidates = EXTENSIONS.map((ext) => `/images/biens/${slug}-${index + 1}.${ext}`);
  const [attempt, setAttempt] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

  // Réinitialise les tentatives si on affiche une autre image (changement de bien/index).
  useEffect(() => {
    setAttempt(0);
    setUseFallback(false);
  }, [slug, index]);

  if (useFallback || !fallback) {
    return <img src={fallback} alt={alt} className={className} loading={loading} />;
  }

  return (
    <img
      src={candidates[attempt]}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => {
        if (attempt < candidates.length - 1) {
          setAttempt(attempt + 1);
        } else {
          setUseFallback(true);
        }
      }}
    />
  );
}
