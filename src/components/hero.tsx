'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { BRAND } from '@/lib/branding'

interface Category {
  id: string
  name: string
  parent_id: string | null
}

export function Hero() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState<string>('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('categories')
        .select('id, name, parent_id')
        .is('parent_id', null)
        .order('name')
      setCategories((data as Category[]) || [])
    }
    load()
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedCat) params.set('cat', selectedCat)
    if (search.trim()) params.set('q', search.trim())
    window.location.href = `/catalogue${params.toString() ? '?' + params.toString() : ''}`
  }

  return (
    <section id="accueil" className="relative bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light text-white overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-brand-blue-light/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold-light text-xs font-semibold mb-6">
            <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></span>
            Quincaillerie de référence · {BRAND.city}
          </div>
          <h1 className="text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight">
            Tout pour vos{' '}
            <span className="bg-gradient-to-r from-brand-gold to-amber-300 bg-clip-text text-transparent">
              chantiers
            </span>{' '}
            et travaux
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-xl">
            Plus de 400 produits en stock à {BRAND.city} : matériaux de construction, plomberie, électricité, outillage.
            Devis rapide · Retrait magasin · Livraison Dakar.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/catalogue"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-brand-gold/30 transition hover:scale-105"
            >
              Voir le catalogue
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event('open-devis'))}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-6 py-3.5 rounded-xl font-semibold transition"
            >
              💬 Demander un devis
            </button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <div className="text-2xl lg:text-3xl font-extrabold text-brand-gold">400+</div>
              <div className="text-xs text-blue-200">Produits en stock</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-extrabold text-brand-gold">15</div>
              <div className="text-xs text-blue-200">Ans d&apos;expérience</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-extrabold text-brand-gold">24h</div>
              <div className="text-xs text-blue-200">Livraison Dakar</div>
            </div>
          </div>
        </motion.div>

        {/* Right: Search card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-8 relative">
            <div className="absolute -top-3 -left-3 bg-brand-gold text-brand-blue-dark text-xs font-bold px-3 py-1 rounded-full">
              ★ TROUVEZ VITE
            </div>
            <h3 className="text-2xl font-bold mb-4">Que cherchez-vous ?</h3>
            <form onSubmit={handleSearch} className="space-y-3">
              <select
                value={selectedCat}
                onChange={e => setSelectedCat(e.target.value)}
                className="w-full bg-white/95 text-brand-blue-dark rounded-lg px-4 py-3 font-medium"
              >
                <option value="">Choisir une catégorie...</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Type de produit (ex: ciment, robinet, ampoule...)"
                className="w-full bg-white/95 text-brand-blue-dark placeholder-gray-500 rounded-lg px-4 py-3"
              />
              <button
                type="submit"
                className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark px-4 py-3 rounded-lg font-bold transition"
              >
                🔍 Rechercher dans le catalogue
              </button>
            </form>
            <p className="mt-4 text-xs text-blue-200 text-center">
              ou appelez : <a href={`tel:${BRAND.primaryTelDial}`} className="font-bold text-brand-gold">{BRAND.phones[0]}</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
