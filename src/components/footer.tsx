'use client'

import Image from 'next/image'
import { BRAND } from '@/lib/branding'

const catalogue = [
  'Matériaux',
  'Plomberie',
  'Électricité',
  'Outillage',
  'Peinture & revêtement',
  'Voir tout',
]

const services = [
  'Livraison Dakar',
  'Devis chantier',
  'Modes de paiement',
  'Retrait magasin',
  'FAQ',
]

export function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={BRAND.logoUrl}
                alt={BRAND.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
              <div>
                <div className="font-extrabold text-white text-lg">{BRAND.name}</div>
                <div className="text-[10px] text-gray-400">{BRAND.fullName} · {BRAND.city}</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Votre quincaillerie de référence à {BRAND.city}. Tout pour vos chantiers BTP,
              plomberie, électricité et travaux.
            </p>
            <div className="mt-4 italic text-xs text-brand-gold">
              «&nbsp;{BRAND.slogan}&nbsp;»
            </div>
          </div>

          {/* Catalogue */}
          <div>
            <h4 className="font-bold text-white mb-4">Catalogue</h4>
            <ul className="space-y-2 text-sm">
              {catalogue.map(c => (
                <li key={c}>
                  <a href="#catalogue" className="hover:text-brand-gold transition">{c}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map(s => (
                <li key={s}>
                  <a
                    href={`https://wa.me/${BRAND.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-gold transition"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Nous joindre</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{BRAND.address}</span>
              </li>
              {BRAND.phones.map(p => (
                <li key={p} className="flex items-center gap-2">
                  <span>📞</span>
                  <a href={`tel:+221${p.replace(/\s/g, '')}`} className="hover:text-brand-gold transition font-medium">
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a
                  href={`https://wa.me/${BRAND.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition font-medium"
                >
                  WhatsApp Business
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Lun-Sam · 8h-19h</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>© 2026 {BRAND.name} — {BRAND.fullName}. Tous droits réservés.</div>
          <div className="flex items-center gap-4">
            <span>
              Site réalisé par{' '}
              <a
                href="https://maditech.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold font-semibold hover:text-amber-300 transition"
              >
                MADItech
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
