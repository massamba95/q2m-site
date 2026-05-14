'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#a-propos', label: 'A propos' },
    { href: '#catalogue', label: 'Catalogue' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3 group">
            <Image
              src="/logo_Q2M.jpg"
              alt="Q2M"
              width={44}
              height={44}
              className="rounded-full shadow-md group-hover:shadow-lg transition-shadow"
            />
            <div>
              <span className={`font-bold text-xl transition-colors ${scrolled ? 'text-brand-blue' : 'text-white'}`}>
                Q2M
              </span>
              <span className={`hidden sm:inline text-sm ml-2 transition-colors ${scrolled ? 'text-brand-gold' : 'text-brand-gold-light'}`}>
                Quincaillerie
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`font-medium transition-colors text-sm hover:text-brand-gold ${
                  scrolled ? 'text-gray-600' : 'text-white/90'
                }`}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => window.dispatchEvent(new Event('open-devis'))}
              className={`text-sm font-semibold px-5 py-2.5 rounded-full border-2 transition-all hover:-translate-y-0.5 ${
                scrolled
                  ? 'border-brand-blue/20 text-brand-blue hover:border-brand-blue hover:bg-brand-blue/5'
                  : 'border-white/30 text-white hover:border-white hover:bg-white/10'
              }`}
            >
              Demander un devis
            </button>
            <a
              href="tel:+221763506867"
              className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-brand-gold/30 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Appelez-nous
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden p-2 transition-colors ${scrolled ? 'text-gray-600' : 'text-white'}`}
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
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white rounded-2xl shadow-xl mb-4"
            >
              <div className="py-3">
                {links.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-6 py-3 text-gray-600 hover:text-brand-blue hover:bg-blue-50 font-medium transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <div className="px-4 pt-2 pb-3 space-y-2">
                  <button
                    onClick={() => { setOpen(false); window.dispatchEvent(new Event('open-devis')) }}
                    className="block w-full text-center border-2 border-brand-blue/20 text-brand-blue hover:bg-brand-blue/5 px-5 py-2.5 rounded-full font-semibold transition-colors"
                  >
                    Demander un devis
                  </button>
                  <a
                    href="tel:+221763506867"
                    className="block text-center bg-brand-gold hover:bg-brand-gold-dark text-white px-5 py-3 rounded-full font-semibold transition-colors"
                  >
                    Appelez-nous
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
