import { motion } from 'framer-motion';
import { MessageCircle, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 lg:px-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="eyebrow mb-2">Nous contacter</p>
        <h1 className="font-display text-4xl font-bold text-d8-cream">Contact</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-d8-cream/75">
          Pour toute question sur un bien du catalogue ou pour organiser une visite, notre équipe reste
          disponible sur Discord. Les commandes se font directement depuis la fiche de chaque bien via le
          bouton « Commander ».
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { icon: MessageCircle, title: 'Discord', text: 'Dynasty 8 — Immobilier' },
          { icon: Clock, title: 'Disponibilité', text: '7j/7, réponse sous 24h' },
          { icon: MapPin, title: 'Bureau', text: 'Downtown, Los Santos' },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-sm border border-d8-line bg-d8-charcoal p-6"
          >
            <item.icon size={22} className="mb-3 text-d8-gold" />
            <h3 className="font-display text-lg font-semibold text-d8-cream">{item.title}</h3>
            <p className="mt-1 text-sm text-d8-cream/70">{item.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-12 rounded-sm border border-d8-gold/30 bg-d8-charcoal p-8"
      >
        <h2 className="font-display text-xl font-semibold text-d8-cream">Comment commander un bien ?</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-d8-cream/75">
          <li>Parcourez le catalogue et ouvrez la fiche du bien qui vous intéresse.</li>
          <li>Cliquez sur le bouton « Commander » disponible sur la fiche.</li>
          <li>Renseignez votre nom RP, votre pseudo Discord et votre téléphone RP.</li>
          <li>Validez : votre demande est transmise à notre équipe qui vous recontactera sur Discord.</li>
        </ol>
      </motion.div>
    </div>
  );
}
