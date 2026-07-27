import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Route API sécurisée (fonction serverless Vercel).
 * Le webhook Discord n'est JAMAIS exposé côté navigateur : il est lu
 * exclusivement depuis la variable d'environnement DISCORD_WEBHOOK_URL,
 * définie sur Vercel (jamais commit dans le dépôt).
 */

interface OrderRequestBody {
  nomRP?: string;
  discord?: string;
  telephoneRP?: string;
  bienNom?: string;
  bienId?: string;
  prix?: number;
  categorie?: string;
  commentaire?: string;
  orderId?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  'habitations-amenagees-petit': 'Habitations aménagées — Petit',
  'habitations-amenagees-grand': 'Habitations aménagées — Grand',
  'habitations-vides': 'Habitations vides',
  garages: 'Garages',
  entrepots: 'Entrepôts',
  construction: 'Construction',
};

function escapeForDiscord(value: string): string {
  // Neutralise les séquences pouvant casser le formatage Markdown de l'embed.
  return value.replace(/[`*_~>]/g, (match) => `\\${match}`).slice(0, 500);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Permet à detectRuntimeEnvironment() de sonder la route sans déclencher
  // d'envoi Discord.
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
    return;
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    res.status(500).json({
      error:
        "Le webhook Discord n'est pas configuré sur le serveur (variable DISCORD_WEBHOOK_URL manquante).",
    });
    return;
  }

  const body = req.body as OrderRequestBody;

  const requiredFields: Array<[keyof OrderRequestBody, string]> = [
    ['nomRP', 'Nom RP'],
    ['discord', 'Discord'],
    ['telephoneRP', 'Téléphone RP'],
    ['bienNom', 'Nom du bien'],
    ['orderId', "ID de commande"],
  ];

  for (const [field, label] of requiredFields) {
    if (!isNonEmptyString(body?.[field] as unknown as string)) {
      res.status(400).json({ error: `Le champ "${label}" est requis.` });
      return;
    }
  }

  const prixAffiche =
    typeof body.prix === 'number' && Number.isFinite(body.prix)
      ? `${body.prix.toLocaleString('fr-FR')} $`
      : 'Non renseigné';

  const categorieAffichee = body.categorie ? CATEGORY_LABELS[body.categorie] ?? body.categorie : 'Non renseignée';

  const embed = {
    title: '🏠 Nouvelle commande',
    color: 0xc9a24b, // Doré
    fields: [
      { name: 'Nom RP', value: escapeForDiscord(body.nomRP!), inline: true },
      { name: 'Discord', value: escapeForDiscord(body.discord!), inline: true },
      { name: 'Téléphone', value: escapeForDiscord(body.telephoneRP!), inline: true },
      { name: 'Bien', value: escapeForDiscord(body.bienNom!), inline: false },
      { name: 'Prix', value: prixAffiche, inline: true },
      { name: 'Catégorie', value: categorieAffichee, inline: true },
      {
        name: 'Commentaire',
        value: isNonEmptyString(body.commentaire) ? escapeForDiscord(body.commentaire) : 'Aucun',
        inline: false,
      },
      { name: 'Date', value: new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }), inline: true },
      { name: 'ID de commande', value: body.orderId!, inline: true },
    ],
    footer: { text: 'Dynasty 8 — Système de commande' },
    timestamp: new Date().toISOString(),
  };

  try {
    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!discordResponse.ok) {
      const text = await discordResponse.text().catch(() => '');
      res.status(502).json({
        error: `Discord a refusé la requête (statut ${discordResponse.status}). ${text}`.trim(),
      });
      return;
    }

    res.status(200).json({ success: true, orderId: body.orderId });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error
          ? `Erreur lors de l'envoi vers Discord : ${error.message}`
          : "Erreur inconnue lors de l'envoi vers Discord.",
    });
  }
}
