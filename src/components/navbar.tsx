'use client'

import { useState } from 'react'
import Image from 'next/image'

export function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#a-propos', label: 'A propos' },
    { href: '#catalogue', label: 'Catalogue' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3">
            <Image
              src="/logo_Q2M.jpg"
              alt="Q2M"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <span className="text-brand-blue font-bold text-lg">Q2M</span>
              <span className="hidden sm:inline text-brand-gold text-sm ml-2">Quincaillerie</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-gray-600 hover:text-brand-blue font-medium transition-colors text-sm"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+221763506867"
              className="bg-brand-gold hover:bg-brand-gold-dark text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors"
            >
              Appelez-nous
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-600"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t pb-4">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-gray-600 hover:text-brand-blue hover:bg-gray-50 font-medium"
              >
                {l.label}
              </a>
            ))}
            <div className="px-4 pt-2">
              <a
                href="tel:+221763506867"
                className="block text-center bg-brand-gold hover:bg-brand-gold-dark text-white px-5 py-2.5 rounded-full font-semibold transition-colors"
              >
                Appelez-nous
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
