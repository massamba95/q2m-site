'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/cart'
import { CategoryIcon, getCategoryPhoto } from './category-icon'
import { slugify } from '@/lib/slugify'

interface Category {
  id: string
  name: string
  parent_id: string | null
}

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

interface Props {
  category: Category
  allCategories: Category[]
}

const CATEGORY_GRADIENT: Record<string, string> = {
  'Matériaux':                  'from-gray-700 to-slate-800',
  'Plomberie':                  'from-blue-500 to-cyan-600',
  'Électricité':                'from-yellow-500 to-orange-500',
  'Outillage':                  'from-red-500 to-rose-600',
  'Peinture & revêtement':      'from-purple-500 to-violet-600',
  'Éclairage':                  'from-amber-400 to-yellow-500',
  'Sécurité & accessoires':     'from-teal-500 to-emerald-600',
  'Quincaillerie & serrurerie': 'from-brand-blue to-blue-600',
  'Consommables divers':        'from-stone-500 to-gray-600',
}

type SortMode = 'designation' | 'price-asc' | 'price-desc' | 'stock-desc'

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' FCFA'
}

export function CategoryPageContent({ category, allCategories }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubCat, setSelectedSubCat] = useState<string | null>(null)
  const [sortMode, setSortMode] = useState<SortMode>('designation')
  const [inStockOnly, setInStockOnly] = useState(false)
  const { addItem, items: cartItems } = useCart()
  const [added, setAdded] = useState<string | null>(null)

  // Si la cat est un parent, on a des sous-cat
  const subCategories = useMemo(
    () => allCategories.filter(c => c.parent_id === category.id),
    [allCategories, category.id],
  )
  const isParent = subCategories.length > 0
  const parentCat = category.parent_id
    ? allCategories.find(c => c.id === category.parent_id)
    : null

  // IDs à inclure : la cat elle-même + ses sous-cat (si parent)
  const includedCategoryIds = useMemo(() => {
    if (isParent) return [category.id, ...subCategories.map(s => s.id)]
    return [category.id]
  }, [category.id, isParent, subCategories])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await supabase
        .from('v_product_stock')
        .select('id, ref_produit, designation, category_id, selling_price, unit, stock_actual, image_url')
        .eq('is_active', true)
        .gt('selling_price', 0)
        .in('category_id', includedCategoryIds)
      setProducts((data || []) as Product[])
      setLoading(false)
    }
    load()
  }, [includedCategoryIds])

  // Filtrer / trier
  const filteredProducts = useMemo(() => {
    let result = products
    if (selectedSubCat) {
      result = result.filter(p => p.category_id === selectedSubCat)
    }
    if (inStockOnly) {
      result = result.filter(p => p.stock_actual > 0)
    }
    const sorted = [...result]
    switch (sortMode) {
      case 'price-asc':
        sorted.sort((a, b) => a.selling_price - b.selling_price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.selling_price - a.selling_price)
        break
      case 'stock-desc':
        sorted.sort((a, b) => b.stock_actual - a.stock_actual)
        break
      default:
        sorted.sort((a, b) => a.designation.localeCompare(b.designation))
    }
    return sorted
  }, [products, selectedSubCat, inStockOnly, sortMode])

  function handleAdd(p: Product) {
    addItem({
      id: p.id,
      ref_produit: p.ref_produit,
      designation: p.designation,
      selling_price: p.selling_price,
      unit: p.unit,
      category_name: category.name,
      image_url: p.image_url,
    })
    setAdded(p.id)
    setTimeout(() => setAdded(prev => prev === p.id ? null : prev), 1500)
  }

  const gradient = CATEGORY_GRADIENT[category.name] || 'from-brand-blue to-brand-blue-light'

  return (
    <>
      {/* Header catégorie */}
      <section className={`bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16 relative">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/70 mb-4 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition">Accueil</Link>
            <span>›</span>
            <Link href="/catalogue" className="hover:text-white transition">Catalogue</Link>
            {parentCat && (
              <>
                <span>›</span>
                <Link
                  href={`/categorie/${slugify(parentCat.name)}`}
                  className="hover:text-white transition"
                >
                  {parentCat.name}
                </Link>
              </>
            )}
            <span>›</span>
            <span className="text-white font-semibold">{category.name}</span>
          </nav>

          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">
                {category.name}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {loading ? 'Chargement…' : `${products.length} produit${products.length > 1 ? 's' : ''} en stock dans cette catégorie.`}
              </p>
            </div>
            <div className="hidden md:block opacity-30 text-9xl">
              <CategoryIcon category={category.name} variant="large" className="w-32 h-32" />
            </div>
          </div>
        </div>
      </section>

      {/* Sous-catégories (chips) si parent */}
      {isParent && subCategories.length > 0 && (
        <section className="bg-white border-b border-gray-200 sticky top-[156px] z-30">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedSubCat(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                !selectedSubCat
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tout · {products.length}
            </button>
            {subCategories
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(sub => {
                const count = products.filter(p => p.category_id === sub.id).length
                if (count === 0) return null
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedSubCat(selectedSubCat === sub.id ? null : sub.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                      selectedSubCat === sub.id
                        ? 'bg-brand-blue text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {sub.name} <span className="text-xs opacity-70">· {count}</span>
                  </button>
                )
              })}
          </div>
        </section>
      )}

      {/* Filtres */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="text-sm text-gray-600">
            <strong className="text-gray-900">{filteredProducts.length}</strong> produit{filteredProducts.length > 1 ? 's' : ''} affiché{filteredProducts.length > 1 ? 's' : ''}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-brand-blue"
              />
              En stock uniquement
            </label>
            <select
              value={sortMode}
              onChange={e => setSortMode(e.target.value as SortMode)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
            >
              <option value="designation">Nom A-Z</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="stock-desc">Stock disponible</option>
            </select>
          </div>
        </div>

        {/* Grid produits */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <CategoryIcon category={category.name} variant="large" className="w-24 h-24 mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">Aucun produit dans ces critères</p>
            <p className="text-sm mt-2">Essayez d&apos;ajuster les filtres ou contactez-nous.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredProducts.map((p, i) => {
              const finalImg = p.image_url || getCategoryPhoto(category.name)
              const outOfStock = p.stock_actual <= 0
              const lowStock = p.stock_actual > 0 && p.stock_actual <= 5
              const isAdded = added === p.id
              const inCart = cartItems.some(it => it.id === p.id)

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
                  className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-blue/30 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col ${
                    outOfStock ? 'opacity-80' : ''
                  }`}
                >
                  <Link href={`/produit/${p.id}`} className="block">
                    <div className="relative aspect-square bg-gray-50 overflow-hidden">
                      {finalImg ? (
                        <Image
                          src={finalImg}
                          alt={p.designation}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="w-20 h-20 text-gray-400">
                            <CategoryIcon category={category.name} variant="large" className="w-full h-full" />
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <Link href={`/produit/${p.id}`} className="block mb-2">
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition">
                        {p.designation}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-gray-400 font-mono mt-1">{p.ref_produit}</p>
                    </Link>

                    <div className="mt-auto pt-2 sm:pt-3 border-t border-dashed border-gray-200">
                      <div className="flex items-baseline justify-between mb-2 gap-1">
                        <span className="text-base sm:text-xl font-bold text-brand-blue leading-none">
                          {formatFCFA(p.selling_price)}
                        </span>
                        <span className="text-[10px] sm:text-xs text-gray-400">/ {p.unit}</span>
                      </div>

                      <div className="mb-2 sm:mb-3">
                        {outOfStock ? (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full" />
                            Rupture
                          </span>
                        ) : lowStock ? (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-500 rounded-full" />
                            Stock: {p.stock_actual}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full" />
                            En stock
                          </span>
                        )}
                      </div>

                      {outOfStock ? (
                        <button disabled className="w-full bg-gray-100 text-gray-400 text-xs sm:text-sm font-semibold py-1.5 sm:py-2 rounded-lg cursor-not-allowed">
                          Indisponible
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAdd(p)}
                          className={`w-full flex items-center justify-center gap-1 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                            isAdded
                              ? 'bg-green-500 text-white'
                              : inCart
                              ? 'bg-brand-gold text-white hover:bg-brand-gold-dark'
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
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </section>

      <div className="h-16" />
    </>
  )
}
