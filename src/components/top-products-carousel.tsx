'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/cart'
import { CategoryIcon, getCategoryPhoto } from './category-icon'

interface Product {
  id: string
  ref_produit: string
  designation: string
  category_id: string | null
  selling_price: number
  unit: string
  stock_actual: number
  image_url: string | null
}

interface Category {
  id: string
  name: string
  parent_id: string | null
}

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA'
}

/**
 * Carrousel horizontal de produits sur l'accueil.
 * - Affiche 15 produits sélectionnés (ceux avec photo en priorité, puis stock le plus élevé)
 * - Flèches gauche/droite pour naviguer
 * - Lien "Voir tout le catalogue" → /catalogue
 */
export function TopProductsCarousel() {
  const [products, setProducts] = useState<(Product & { category_name: string })[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()
  const [added, setAdded] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const [prodRes, catRes] = await Promise.all([
        supabase
          .from('v_product_stock')
          .select('id, ref_produit, designation, category_id, selling_price, unit, stock_actual, image_url')
          .eq('is_active', true)
          .gt('selling_price', 0)
          .gt('stock_actual', 0)
          .order('stock_actual', { ascending: false })
          .limit(20),
        supabase.from('categories').select('id, name, parent_id'),
      ])

      const cats = (catRes.data || []) as Category[]
      const byId = cats.reduce<Record<string, Category>>((acc, c) => { acc[c.id] = c; return acc }, {})

      // Priorité aux produits avec photo
      const prods = ((prodRes.data || []) as Product[])
        .sort((a, b) => (b.image_url ? 1 : 0) - (a.image_url ? 1 : 0))
        .slice(0, 15)
        .map(p => {
          const cat = p.category_id ? byId[p.category_id] : null
          const parentCat = cat?.parent_id ? byId[cat.parent_id] : cat
          return { ...p, category_name: parentCat?.name || 'Autres' }
        })

      setProducts(prods)
      setLoading(false)
    }
    load()
  }, [])

  function scroll(direction: 'left' | 'right') {
    if (!scrollRef.current) return
    const cardWidth = 280 // approx width of one card + gap
    scrollRef.current.scrollBy({ left: direction === 'right' ? cardWidth * 2 : -cardWidth * 2, behavior: 'smooth' })
  }

  function handleAdd(p: Product & { category_name: string }) {
    addItem({
      id: p.id,
      ref_produit: p.ref_produit,
      designation: p.designation,
      selling_price: p.selling_price,
      unit: p.unit,
      category_name: p.category_name,
      image_url: p.image_url,
    })
    setAdded(p.id)
    setTimeout(() => setAdded(prev => prev === p.id ? null : prev), 1500)
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-gray-400">Chargement des produits…</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
              🔥 Top ventes
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-brand-blue tracking-tight">
              Nos produits les plus demandés
            </h2>
          </div>
          <Link
            href="/catalogue"
            className="hidden sm:inline-flex items-center gap-1 text-brand-blue font-semibold hover:gap-2 transition group"
          >
            Voir tout le catalogue
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Précédent"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center hover:bg-brand-blue hover:text-white transition-all hover:scale-110 border border-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Suivant"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-xl rounded-full items-center justify-center hover:bg-brand-blue hover:text-white transition-all hover:scale-110 border border-gray-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable products list */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            {products.map(p => {
              const finalImg = p.image_url || getCategoryPhoto(p.category_name)
              const isAdded = added === p.id

              return (
                <div
                  key={p.id}
                  className="flex-shrink-0 w-[180px] sm:w-[220px] md:w-[260px] snap-start bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-brand-blue/30 hover:-translate-y-1 transition-all flex flex-col group"
                >
                  <Link href={`/produit/${p.id}`} className="block">
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {finalImg ? (
                        <Image
                          src={finalImg}
                          alt={p.designation}
                          fill
                          sizes="260px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-20 h-20 text-gray-400">
                            <CategoryIcon category={p.category_name} variant="large" className="w-full h-full" />
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <Link href={`/produit/${p.id}`} className="block mb-2">
                      <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">{p.category_name}</div>
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition">
                        {p.designation}
                      </h4>
                    </Link>

                    <div className="mt-auto pt-2 sm:pt-3 border-t border-dashed border-gray-200">
                      <div className="flex items-baseline justify-between mb-2 gap-1">
                        <span className="text-base sm:text-lg font-bold text-brand-blue leading-none">{formatFCFA(p.selling_price)}</span>
                        <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">/ {p.unit}</span>
                      </div>
                      <button
                        onClick={() => handleAdd(p)}
                        className={`w-full flex items-center justify-center gap-1 px-2 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                          isAdded
                            ? 'bg-green-500 text-white'
                            : 'bg-brand-blue text-white hover:bg-brand-blue-light'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            Ajouté !
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Ajouter
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1 text-brand-blue font-semibold"
          >
            Voir tout le catalogue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
