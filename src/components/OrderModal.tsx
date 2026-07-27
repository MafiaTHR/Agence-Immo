import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import type { Property } from '../types/property';
import { categoryLabel } from '../types/property';
import { submitOrder } from '../lib/order';

interface OrderModalProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function OrderModal({ property, open, onClose }: OrderModalProps) {
  const [nomRP, setNomRP] = useState('');
  const [discord, setDiscord] = useState('');
  const [telephoneRP, setTelephoneRP] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [feedback, setFeedback] = useState('');

  function resetAndClose() {
    setState('idle');
    setFeedback('');
    onClose();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setState('loading');

    const result = await submitOrder({
      nomRP,
      discord,
      telephoneRP,
      bienNom: property.nom,
      bienId: property.id,
      prix: property.prix,
      categorie: property.categorie,
      commentaire,
    });

    setFeedback(result.message);
    setState(result.success ? 'success' : 'error');
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-d8-black/80 backdrop-blur-sm p-4"
          onClick={resetAndClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="deed-corner max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-sm border border-d8-gold/40 bg-d8-charcoal shadow-gold"
          >
            <div className="flex items-center justify-between border-b border-d8-line px-6 py-5">
              <div>
                <p className="eyebrow mb-1">Bon de commande</p>
                <h2 className="font-display text-xl font-semibold text-d8-cream">{property.nom}</h2>
              </div>
              <button onClick={resetAndClose} aria-label="Fermer" className="rounded-sm p-1.5 text-d8-muted hover:text-d8-gold">
                <X size={22} />
              </button>
            </div>

            {state === 'success' ? (
              <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
                <CheckCircle2 size={48} className="text-d8-gold" />
                <p className="text-d8-cream">{feedback}</p>
                <button
                  onClick={resetAndClose}
                  className="mt-2 rounded-sm border border-d8-gold px-6 py-2.5 text-sm uppercase tracking-wide text-d8-gold transition-colors hover:bg-d8-gold hover:text-d8-black"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6">
                <div className="grid grid-cols-2 gap-3 rounded-sm border border-d8-line bg-d8-black/50 p-4 text-sm">
                  <div>
                    <span className="text-d8-muted">Bien</span>
                    <p className="font-medium text-d8-cream">{property.nom}</p>
                  </div>
                  <div>
                    <span className="text-d8-muted">Prix</span>
                    <p className="font-mono text-d8-gold-bright">{property.prix.toLocaleString('fr-FR')} $</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-d8-muted">Catégorie</span>
                    <p className="text-d8-cream">{categoryLabel(property.categorie)}</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="nomRP" className="eyebrow mb-1.5 block">Nom RP *</label>
                  <input
                    id="nomRP"
                    required
                    value={nomRP}
                    onChange={(e) => setNomRP(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-sm border border-d8-line bg-d8-black px-3 py-2.5 text-sm text-d8-cream placeholder:text-d8-muted focus:border-d8-gold"
                  />
                </div>

                <div>
                  <label htmlFor="discord" className="eyebrow mb-1.5 block">Discord *</label>
                  <input
                    id="discord"
                    required
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    placeholder="pseudo_discord"
                    className="w-full rounded-sm border border-d8-line bg-d8-black px-3 py-2.5 text-sm text-d8-cream placeholder:text-d8-muted focus:border-d8-gold"
                  />
                </div>

                <div>
                  <label htmlFor="telephoneRP" className="eyebrow mb-1.5 block">Téléphone RP *</label>
                  <input
                    id="telephoneRP"
                    required
                    value={telephoneRP}
                    onChange={(e) => setTelephoneRP(e.target.value)}
                    placeholder="555-0123"
                    className="w-full rounded-sm border border-d8-line bg-d8-black px-3 py-2.5 text-sm text-d8-cream placeholder:text-d8-muted focus:border-d8-gold"
                  />
                </div>

                <div>
                  <label htmlFor="commentaire" className="eyebrow mb-1.5 block">Commentaires</label>
                  <textarea
                    id="commentaire"
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    rows={3}
                    placeholder="Informations complémentaires..."
                    className="w-full resize-none rounded-sm border border-d8-line bg-d8-black px-3 py-2.5 text-sm text-d8-cream placeholder:text-d8-muted focus:border-d8-gold"
                  />
                </div>

                {state === 'error' && (
                  <div className="flex items-start gap-2 rounded-sm border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
                    <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                    <span>{feedback}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === 'loading'}
                  className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-d8-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-d8-black transition-colors hover:bg-d8-gold-bright disabled:opacity-60"
                >
                  {state === 'loading' && <Loader2 size={16} className="animate-spin" />}
                  {state === 'loading' ? 'Envoi en cours...' : 'Valider la commande'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
