'use client'

import { BRAND } from '@/lib/branding'

/**
 * Bandeau utilitaire en haut du site avec téléphone, WhatsApp et horaires.
 * Sticky avec le reste du header.
 */
export function TopBar() {
  return (
    <div className="bg-brand-blue-dark text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href={`tel:${BRAND.primaryTelDial}`} className="flex items-center gap-1.5 hover:text-brand-gold transition">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
            </svg>
            <span>{BRAND.phones[0]} · {BRAND.address}</span>
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`https://wa.me/${BRAND.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-brand-gold transition"
          >
            💬 WhatsApp
          </a>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">Lun-Sam · 8h-19h</span>
        </div>
      </div>
    </div>
  )
}
