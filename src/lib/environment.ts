/**
 * Détecte l'environnement d'exécution afin d'adapter le comportement du
 * formulaire de commande :
 *  - "static"  → hébergement statique (GitHub Pages) : pas de route API disponible.
 *  - "serverless" → hébergement avec fonctions serverless (Vercel/Netlify) :
 *    la route /api/order est utilisable pour envoyer la commande sur Discord.
 *
 * La détection se fait uniquement côté client, sans dépendre de variables
 * d'environnement construites au build, afin qu'un même bundle statique
 * fonctionne correctement qu'il soit déployé sur GitHub Pages ou sur Vercel.
 */
export type RuntimeEnvironment = 'static' | 'serverless';

let cachedEnvironment: RuntimeEnvironment | null = null;
let detectionPromise: Promise<RuntimeEnvironment> | null = null;

function hostnameLooksStatic(hostname: string): boolean {
  return hostname.endsWith('github.io');
}

/**
 * Effectue une détection asynchrone en interrogeant réellement la route
 * /api/order via une requête OPTIONS/HEAD légère. Si la route répond (même
 * avec une erreur de méthode), on est en environnement serverless. Si la
 * requête échoue franchement (404 réseau, pas de route), on retombe en mode
 * statique.
 */
export async function detectRuntimeEnvironment(): Promise<RuntimeEnvironment> {
  if (cachedEnvironment) return cachedEnvironment;
  if (detectionPromise) return detectionPromise;

  detectionPromise = (async () => {
    if (typeof window === 'undefined') {
      cachedEnvironment = 'static';
      return cachedEnvironment;
    }

    // GitHub Pages n'a jamais de fonctions serverless : court-circuit rapide.
    if (hostnameLooksStatic(window.location.hostname)) {
      cachedEnvironment = 'static';
      return cachedEnvironment;
    }

    try {
      const response = await fetch('/api/order', { method: 'OPTIONS' });
      // Une réponse 404 signifie qu'aucune fonction serverless n'est déployée
      // (par ex. build statique servi ailleurs que Vercel/Netlify).
      cachedEnvironment = response.status === 404 ? 'static' : 'serverless';
    } catch {
      cachedEnvironment = 'static';
    }

    return cachedEnvironment;
  })();

  return detectionPromise;
}

export function getCachedEnvironment(): RuntimeEnvironment | null {
  return cachedEnvironment;
}
