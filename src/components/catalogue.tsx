'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { FadeIn } from './animations'
import { useCart } from '@/lib/cart'

interface Product {
  id: string
  ref_produit: string
  designation: string
  category_id: string | null
  selling_price: number
  unit: string
  stock_actual: number
}

interface Category {
  id: string
  name: string
}

const CATEGORY_META: Record<string, { icon: string; gradient: string }> = {
  'Électricité': { icon: '⚡', gradient: 'from-yellow-400 to-orange-500' },
  'Éclairage': { icon: '💡', gradient: 'from-amber-400 to-yellow-500' },
  'Plomberie': { icon: '🔧', gradient: 'from-blue-400 to-cyan-500' },
  'Matériaux': { icon: '🏗️', gradient: 'from-gray-500 to-slate-600' },
  'Outillage': { icon: '🛠️', gradient: 'from-red-400 to-rose-500' },
  'Peinture': { icon: '🎨', gradient: 'from-purple-400 to-violet-500' },
  'Quincaillerie': { icon: '🔩', gradient: 'from-brand-blue to-blue-600' },
  'Accessoires': { icon: '🔗', gradient: 'from-teal-400 to-emerald-500' },
  'Consommables': { icon: '📦', gradient: 'from-brand-gold to-amber-500' },
  'Autres': { icon: '📦', gradient: 'from-gray-400 to-gray-500' },
}

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA'
}

export function Catalogue() {
  const [products, setProducts] = useState<(Product & { category_name: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [addedToast, setAddedToast] = useState<string | null>(null)
  const { items: cartItems, addItem } = useCart()

  function handleAddToCart(product: Product & { category_name: string }) {
    addItem({
      id: product.id,
      ref_produit: product.ref_produit,
      designation: product.designation,
      selling_price: product.selling_price,
      unit: product.unit,
      category_name: product.category_name,
    })
    setAddedToast(product.id)
    setTimeout(() => setAddedToast(prev => prev === product.id ? null : prev), 1500)
  }

  useEffect(() => {
    async function load() {
      const [prodRes, catRes] = await Promise.all([
        supabase
          .from('v_product_stock')
          .select('id, ref_produit, designation, category_id, selling_price, unit, stock_actual')
          .eq('is_active', true)
          .gt('selling_price', 0)
          .order('designation'),
        supabase.from('categories').select('id, name'),
      ])

      const cats = (catRes.data || []) as Category[]
      const catMap = cats.reduce<Record<string, string>>((acc, c) => {
        acc[c.id] = c.name
        return acc
      }, {})

      const prods = ((prodRes.data || []) as Product[]).map(p => ({
        ...p,
        stock_actual: p.stock_actual ?? 0,
        category_name: p.category_id ? catMap[p.category_id] || 'Autres' : 'Autres',
      }))

      setProducts(prods)
      setLoading(false)
    }
    load()
  }, [])

  const categories = products.reduce<Record<string, typeof products>>((acc, p) => {
    const cat = p.category_name
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  const categoryNames = Object.keys(categories).sort()

  const filteredProducts = products.filter(p => {
    const matchSearch = !search || p.designation.toLowerCase().includes(search.toLowerCase()) || p.ref_produit.toLowerCase().includes(search.toLowerCase())
    const matchCategory = !activeCategory || p.category_name === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <section id="catalogue" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-wider bg-brand-gold/10 px-4 py-1.5 rounded-full mb-4">
              Catalogue
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-blue mt-3 mb-6">
              Nos produits
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {loading ? 'Chargement...' : `${products.length} produits disponibles a la commande`}
            </p>
          </div>
        </FadeIn>

        {!loading && (
          <>
            {/* Search */}
            <FadeIn delay={0.1}>
              <div className="max-w-md mx-auto mb-6">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm shadow-sm"
                  />
                </div>
              </div>
            </FadeIn>

            {/* Category filters */}
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    !activeCategory
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tous ({products.length})
                </button>
                {categoryNames.map(cat => {
                  const meta = CATEGORY_META[cat] || CATEGORY_META['Autres']
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        activeCategory === cat
                          ? 'bg-brand-blue text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {meta.icon} {cat} ({categories[cat].length})
                    </button>
                  )
                })}
              </div>
            </FadeIn>

            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">Aucun produit trouve pour &quot;{search}&quot;</p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03 } },
                }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filteredProducts.map(p => {
                  const meta = CATEGORY_META[p.category_name] || CATEGORY_META['Autres']
                  const outOfStock = p.stock_actual <= 0
                  const lowStock = p.stock_actual > 0 && p.stock_actual <= 5
                  return (
                    <motion.div
                      key={p.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className={`group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col ${
                        outOfStock ? 'opacity-75' : 'hover:shadow-lg hover:-translate-y-1'
                      }`}
                    >
                      {/* Category accent */}
                      <div className={`h-1 bg-gradient-to-r ${meta.gradient}`} />

                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${meta.gradient} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>
                            {meta.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                              {p.designation}
                            </h4>
                            <p className="text-xs text-gray-400 mt-0.5">{p.ref_produit}</p>
                          </div>
                        </div>

                        <div className="mt-auto pt-3 border-t border-gray-100">
                          <div className="flex items-baseline justify-between mb-2">
                            <span className="text-xl font-bold text-brand-blue">{formatFCFA(p.selling_price)}</span>
                            <span className="text-xs text-gray-400">/ {p.unit}</span>
                          </div>

                          {/* Stock status */}
                          <div className="mb-3">
                            {outOfStock ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                                Rupture de stock
                              </span>
                            ) : lowStock ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                Plus que {p.stock_actual} en stock
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                En stock
                              </span>
                            )}
                          </div>

                          {/* Add to cart button */}
                          {outOfStock ? (
                            <button
                              disabled
                              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold bg-gray-100 text-gray-400 cursor-not-allowed"
                            >
                              Indisponible
                            </button>
                          ) : (
                          <button
                            onClick={() => handleAddToCart(p)}
                            className={`flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-md group/btn ${
                              addedToast === p.id
                                ? 'bg-green-100 text-green-700'
                                : cartItems.some(i => i.id === p.id)
                                ? 'bg-brand-gold text-white hover:bg-brand-gold-dark'
                                : 'bg-brand-blue text-white hover:bg-brand-blue-dark'
                            }`}
                          >
                            {addedToast === p.id ? (
                              <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                                Ajouté au panier !
                              </>
                            ) : cartItems.some(i => i.id === p.id) ? (
                              <>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Dans le panier — ajouter +1
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Ajouter au panier
                              </>
                            )}
                          </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </>
        )}

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-9 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-16">
            <div className="inline-block bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 sm:p-10">
              <p className="text-gray-600 text-lg mb-5">Vous ne trouvez pas ce que vous cherchez ?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+221763506867"
                  className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Appelez-nous
                </a>
                <a
                  href="https://wa.me/221763506867"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
