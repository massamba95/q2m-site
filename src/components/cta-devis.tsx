'use client'

import { BRAND } from '@/lib/branding'

export function CtaDevis() {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light text-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 text-center relative">
        <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">
          Un{' '}
          <span className="bg-gradient-to-r from-brand-gold to-amber-300 bg-clip-text text-transparent">
            chantier
          </span>{' '}
          important ?<br />
          On vous fait un devis sur mesure.
        </h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
          Envoyez-nous votre liste de matériaux ou parlez-nous de votre projet. Réponse sous 2h en journée.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`https://wa.me/${BRAND.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark px-8 py-4 rounded-xl font-bold shadow-lg shadow-brand-gold/30 transition hover:scale-105 inline-flex items-center gap-2"
          >
            💬 WhatsApp · Devis immédiat
          </a>
          <a
            href={`tel:${BRAND.primaryTelDial}`}
            className="bg-white/10 backdrop-blur hover:bg-white/20 border border-white/20 px-8 py-4 rounded-xl font-bold transition inline-flex items-center gap-2"
          >
            📞 {BRAND.phones[0]}
          </a>
        </div>
      </div>
    </section>
  )
}
