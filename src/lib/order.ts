import { detectRuntimeEnvironment } from './environment';

export interface OrderPayload {
  nomRP: string;
  discord: string;
  telephoneRP: string;
  bienNom: string;
  bienId: string;
  prix: number;
  categorie: string;
  commentaire: string;
}

export interface OrderResult {
  success: boolean;
  mode: 'static' | 'serverless';
  orderId: string;
  message: string;
}

const LOCAL_ORDERS_KEY = 'dynasty8_orders_simulees';

function generateOrderId(): string {
  const now = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `D8-${now}-${rand}`;
}

/**
 * Mode statique (GitHub Pages) : aucune route API n'est disponible.
 * La commande est enregistrée dans le localStorage du navigateur, qui simule
 * un fichier JSON local persistant, afin que le formulaire reste pleinement
 * fonctionnel sans backend.
 */
function saveOrderLocally(payload: OrderPayload, orderId: string): void {
  try {
    const raw = window.localStorage.getItem(LOCAL_ORDERS_KEY);
    const existing: Array<OrderPayload & { orderId: string; date: string }> = raw ? JSON.parse(raw) : [];
    existing.push({ ...payload, orderId, date: new Date().toISOString() });
    window.localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(existing, null, 2));
  } catch {
    // Le stockage local peut échouer (navigation privée, quota atteint...),
    // ce n'est pas bloquant : la commande a tout de même été "traitée" côté UI.
  }
}

export function getSimulatedOrders(): Array<OrderPayload & { orderId: string; date: string }> {
  try {
    const raw = window.localStorage.getItem(LOCAL_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function submitOrder(payload: OrderPayload): Promise<OrderResult> {
  const environment = await detectRuntimeEnvironment();
  const orderId = generateOrderId();

  if (environment === 'static') {
    saveOrderLocally(payload, orderId);
    return {
      success: true,
      mode: 'static',
      orderId,
      message:
        "Ce site est hébergé en mode statique (GitHub Pages) : la commande a été enregistrée localement dans votre navigateur. Pour un envoi automatique vers Discord, déployez le projet sur Vercel avec la variable DISCORD_WEBHOOK_URL configurée.",
    };
  }

  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, orderId }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.error ?? `Le serveur a répondu avec le statut ${response.status}`);
    }

    return {
      success: true,
      mode: 'serverless',
      orderId,
      message: 'Votre commande a bien été transmise à notre équipe sur Discord.',
    };
  } catch (error) {
    return {
      success: false,
      mode: 'serverless',
      orderId,
      message:
        error instanceof Error
          ? `Échec de l'envoi de la commande : ${error.message}`
          : "Échec de l'envoi de la commande. Merci de réessayer.",
    };
  }
}
