'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  ref_produit: string
  designation: string
  category_id: string | null
  selling_price: number
  unit: string
  is_active: boolean
}

interface Category {
  id: string
  name: string
}

const CATEGORY_ICONS: Record<string, string> = {
  'Électricité': '⚡',
  'Éclairage': '💡',
  'Plomberie': '🔧',
  'Accessoires': '🔗',
  'Matériaux': '🏗️',
  'Outillage': '🛠️',
  'Consommables': '📦',
  'Peinture': '🎨',
  'Quincaillerie': '🔩',
}

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA'
}

export function Catalogue() {
  const [products, setProducts] = useState<(Product & { category_name: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      // Fetch products and categories separately (both have public read RLS)
      const [prodRes, catRes] = await Promise.all([
        supabase
          .from('products')
          .select('id, ref_produit, designation, category_id, selling_price, unit, is_active')
          .eq('is_active', true)
          .order('designation'),
        supabase
          .from('categories')
          .select('id, name'),
      ])

      const cats = (catRes.data || []) as Category[]
      const catMap = cats.reduce<Record<string, string>>((acc, c) => {
        acc[c.id] = c.name
        return acc
      }, {})

      const prods = ((prodRes.data || []) as Product[]).map(p => ({
        ...p,
        category_name: p.category_id ? catMap[p.category_id] || 'Autres' : 'Autres',
      }))

      setProducts(prods)
      setLoading(false)
    }
    load()
  }, [])

  // Group by category
  const categories = products.reduce<Record<string, typeof products>>((acc, p) => {
    const cat = p.category_name
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  const categoryNames = Object.keys(categories).sort()

  // Filter
  const filteredProducts = products.filter(p => {
    const matchSearch = !search || p.designation.toLowerCase().includes(search.toLowerCase()) || p.ref_produit.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !activeCategory || p.category_name === activeCategory
    return matchSearch && matchCategory
  })

  const filteredCategories = filteredProducts.reduce<Record<string, typeof products>>((acc, p) => {
    const cat = p.category_name
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  const totalProducts = products.length

  return (
    <section id="catalogue" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-gold font-semibold text-sm uppercase tracking-wider">Catalogue</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mt-3 mb-5">
            Nos produits
          </h2>
          <p className="text-gray-600 text-lg">
            {loading ? 'Chargement...' : `${totalProducts} produits disponibles en magasin`}
          </p>
        </div>

        {!loading && (
          <>
            {/* Search */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                />
              </div>
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !activeCategory
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Tous ({totalProducts})
              </button>
              {categoryNames.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {CATEGORY_ICONS[cat] || '📦'} {cat} ({categories[cat].length})
                </button>
              ))}
            </div>

            {/* Products by category */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Aucun produit trouve pour &quot;{search}&quot;</p>
              </div>
            ) : (
              <div className="space-y-10">
                {Object.keys(filteredCategories).sort().map(cat => (
                  <div key={cat}>
                    <h3 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-2">
                      <span className="text-2xl">{CATEGORY_ICONS[cat] || '📦'}</span>
                      {cat}
                      <span className="text-sm font-normal text-gray-400">({filteredCategories[cat].length})</span>
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredCategories[cat].map(p => (
                        <div
                          key={p.id}
                          className="group bg-white rounded-xl border border-gray-100 p-4 hover:border-brand-gold/30 hover:shadow-md transition-all duration-200"
                        >
                          <div className="min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-brand-blue transition-colors">
                              {p.designation}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">{p.ref_produit}</p>
                          </div>
                          <div className="flex items-end justify-between mt-3">
                            {p.selling_price > 0 ? (
                              <>
                                <span className="text-lg font-bold text-brand-blue">{formatFCFA(p.selling_price)}</span>
                                <span className="text-xs text-gray-400">/ {p.unit}</span>
                              </>
                            ) : (
                              <span className="text-sm text-gray-400 italic">Prix en magasin</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-5 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
          <a
            href="tel:+221763506867"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Appelez-nous pour commander
          </a>
        </div>
      </div>
    </section>
  )
}
