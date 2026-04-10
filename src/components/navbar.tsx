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
            <a
              href="tel:+221763506867"
              className="bg-brand-gold hover:bg-brand-gold-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-brand-gold/30 hover:-translate-y-0.5"
            >
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
                <div className="px-4 pt-2 pb-3">
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
