'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/slugify'

interface Category {
  id: string
  name: string
  parent_id: string | null
}

/**
 * Mega-menu hiérarchique connecté à la DB.
 * - Affiche les catégories parentes en horizontal
 * - Au hover, affiche un panneau avec les sous-catégories
 * - Click sur une catégorie → scroll vers le catalogue avec filtre appliqué
 */
export function MegaMenu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [openParent, setOpenParent] = useState<string | null>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('categories')
        .select('id, name, parent_id')
        .order('name')
      setCategories((data as Category[]) || [])
    }
    load()
  }, [])

  // Noms abrégés pour le mega-menu (pour faire tenir sur une ligne)
  const SHORT_NAMES: Record<string, string> = {
    'Consommables divers': 'Consommables',
    'Peinture & revêtement': 'Peinture',
    'Quincaillerie & serrurerie': 'Quincaillerie',
    'Sécurité & accessoires': 'Sécurité',
  }

  const parents = categories
    .filter(c => !c.parent_id)
    .sort((a, b) => a.name.localeCompare(b.name))

  const subsByParent = categories.reduce<Record<string, Category[]>>((acc, c) => {
    if (c.parent_id) {
      if (!acc[c.parent_id]) acc[c.parent_id] = []
      acc[c.parent_id].push(c)
    }
    return acc
  }, {})

  function handleEnter(parentId: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenParent(parentId)
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpenParent(null), 150)
  }

  function selectCategory(categoryId: string) {
    setOpenParent(null)
    if (categoryId === 'all') {
      window.location.href = '/catalogue'
      return
    }
    const cat = categories.find(c => c.id === categoryId)
    if (!cat) return
    window.location.href = `/categorie/${slugify(cat.name)}`
  }

  return (
    <nav className="bg-brand-blue text-white relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide">
        <button
          onClick={() => selectCategory('all')}
          className="px-4 py-3 hover:bg-brand-blue-light transition flex items-center gap-2 font-semibold border-r border-white/10 whitespace-nowrap"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          Tous les produits
        </button>

        {parents.map(parent => {
          const subs = subsByParent[parent.id] || []
          const isOpen = openParent === parent.id
          return (
            <div
              key={parent.id}
              className="relative"
              onMouseEnter={() => handleEnter(parent.id)}
              onMouseLeave={handleLeave}
            >
              <button
                onClick={() => selectCategory(parent.id)}
                className={`px-4 py-3 transition text-sm whitespace-nowrap font-medium ${
                  isOpen ? 'bg-brand-blue-light' : 'hover:bg-brand-blue-light'
                }`}
              >
                {SHORT_NAMES[parent.name] || parent.name}
                {subs.length > 0 && (
                  <svg className="inline-block w-3 h-3 ml-1 -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>

              {/* Dropdown */}
              {isOpen && subs.length > 0 && (
                <div
                  className="absolute left-0 top-full bg-white text-gray-800 shadow-2xl rounded-b-xl border border-gray-100 min-w-[260px] z-50 py-2"
                  onMouseEnter={() => handleEnter(parent.id)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    onClick={() => selectCategory(parent.id)}
                    className="w-full text-left px-4 py-2 hover:bg-brand-blue/5 font-bold text-brand-blue text-sm border-b border-gray-100"
                  >
                    Voir tout · {parent.name} →
                  </button>
                  {subs
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => selectCategory(sub.id)}
                        className="w-full text-left px-4 py-2 hover:bg-brand-blue/5 text-sm transition"
                      >
                        {sub.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          )
        })}

        <div className="ml-auto flex items-center gap-3 pr-2 whitespace-nowrap">
          <button
            onClick={() => window.dispatchEvent(new Event('open-devis'))}
            className="px-3 py-1 bg-brand-gold hover:bg-brand-gold-dark rounded-md text-xs font-bold uppercase tracking-wider transition"
          >
            💬 Devis rapide
          </button>
        </div>
      </div>
    </nav>
  )
}
