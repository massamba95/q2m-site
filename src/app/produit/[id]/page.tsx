'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/lib/cart'
import { BRAND } from '@/lib/branding'
import { TopBar } from '@/components/top-bar'
import { Header } from '@/components/header'
import { MegaMenu } from '@/components/mega-menu'
import { Footer } from '@/components/footer'
import { Cart } from '@/components/cart'
import { DevisModal } from '@/components/devis-modal'
import { CategoryIcon, getCategoryPhoto } from '@/components/category-icon'

interface Product {
  id: string
  ref_produit: string
  designation: string
  category_id: string | null
  category_name?: string
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

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [similar, setSimilar] = useState<Product[]>([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [prodRes, catRes] = await Promise.all([
        supabase.from('v_product_stock').select('*').eq('id', id).maybeSingle(),
        supabase.from('categories').select('id, name, parent_id'),
      ])

      if (prodRes.data) {
        setProduct(prodRes.data as Product)
        const cats = (catRes.data || []) as Category[]
        setCategories(cats)

        // Produits similaires : même catégorie, autres produits, max 4
        if (prodRes.data.category_id) {
          const { data: sims } = await supabase
            .from('v_product_stock')
            .select('*')
            .eq('category_id', prodRes.data.category_id)
            .eq('is_active', true)
            .gt('selling_price', 0)
            .neq('id', id)
            .limit(4)
          setSimilar((sims || []) as Product[])
        }
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <main>
        <TopBar />
        <Header />
        <MegaMenu />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-gray-500">
          Chargement du produit…
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main>
        <TopBar />
        <Header />
        <MegaMenu />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-brand-blue mb-4">Produit introuvable</h1>
          <p className="text-gray-600 mb-8">Ce produit n&apos;existe plus ou a été retiré.</p>
          <button onClick={() => router.push('/')} className="bg-brand-blue text-white px-6 py-3 rounded-xl hover:bg-brand-blue-light transition">
            Retour à l&apos;accueil
          </button>
        </div>
        <Footer />
      </main>
    )
  }

  const categoryById = categories.reduce<Record<string, Category>>((acc, c) => { acc[c.id] = c; return acc }, {})
  const cat = product.category_id ? categoryById[product.category_id] : null
  const parentCat = cat?.parent_id ? categoryById[cat.parent_id] : null

  const outOfStock = product.stock_actual <= 0
  const lowStock = product.stock_actual > 0 && product.stock_actual <= 5

  const productImage = product.image_url || getCategoryPhoto(parentCat?.name || cat?.name || '') || null

  function handleAddToCart() {
    if (!product) return
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        ref_produit: product.ref_produit,
        designation: product.designation,
        selling_price: product.selling_price,
        unit: product.unit,
        category_name: parentCat?.name || cat?.name || 'Autres',
        image_url: product.image_url,
      })
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function handleWhatsApp() {
    if (!product) return
    const message = encodeURIComponent(
      `Bonjour Q2M, je souhaite commander :\n\n${quantity}x ${product.designation} (${product.ref_produit})\nPrix unitaire : ${formatFCFA(product.selling_price)}\nTotal : ${formatFCFA(product.selling_price * quantity)}`
    )
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <main>
      <TopBar />
      <Header />
      <MegaMenu />

      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-brand-blue transition">Accueil</Link>
          <span>›</span>
          <Link href="/#catalogue" className="hover:text-brand-blue transition">Catalogue</Link>
          {parentCat && (
            <>
              <span>›</span>
              <Link href="/#catalogue" className="hover:text-brand-blue transition">{parentCat.name}</Link>
            </>
          )}
          {cat && (
            <>
              <span>›</span>
              <span className="text-gray-700">{cat.name}</span>
            </>
          )}
        </nav>

        {/* Main grid : image + info */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group"
          >
            {productImage ? (
              <Image
                src={productImage}
                alt={product.designation}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="w-40 h-40 text-gray-400">
                  <CategoryIcon category={parentCat?.name || 'Autres'} variant="large" className="w-full h-full" />
                </div>
              </div>
            )}
            {cat && (
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {cat.name}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="text-xs uppercase tracking-wider text-brand-gold font-bold mb-2">
              Réf. {product.ref_produit}
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-brand-blue leading-tight mb-4">
              {product.designation}
            </h1>

            {/* Stock badge */}
            <div className="mb-6">
              {outOfStock ? (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  Rupture de stock
                </span>
              ) : lowStock ? (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-amber-500 rounded-full" />
                  Plus que {product.stock_actual} en stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  En stock · {product.stock_actual} disponibles
                </span>
              )}
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-brand-blue/5 to-brand-blue-light/5 border border-brand-blue/10 rounded-2xl p-6 mb-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Prix unitaire</div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl lg:text-5xl font-black text-brand-blue">{formatFCFA(product.selling_price)}</span>
                <span className="text-gray-500">/ {product.unit}</span>
              </div>
              {quantity > 1 && (
                <div className="mt-3 pt-3 border-t border-brand-blue/10 text-sm">
                  <span className="text-gray-600">Total ({quantity} × {product.unit}) : </span>
                  <span className="font-bold text-brand-blue">{formatFCFA(product.selling_price * quantity)}</span>
                </div>
              )}
            </div>

            {/* Quantity selector */}
            {!outOfStock && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Quantité</label>
                <div className="inline-flex items-center bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-12 text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
                    aria-label="Diminuer"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock_actual}
                    value={quantity}
                    onChange={e => setQuantity(Math.max(1, Math.min(product.stock_actual, parseInt(e.target.value) || 1)))}
                    className="w-16 h-12 text-center font-bold text-lg outline-none"
                  />
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock_actual, q + 1))}
                    className="w-12 h-12 text-xl font-bold text-gray-600 hover:bg-gray-100 transition"
                    aria-label="Augmenter"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {outOfStock ? (
                <button disabled className="flex-1 bg-gray-200 text-gray-500 font-semibold py-4 rounded-xl cursor-not-allowed">
                  Indisponible
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold transition-all shadow-lg ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-brand-blue hover:bg-brand-blue-light text-white hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  {added ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      Ajouté au panier !
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Ajouter au panier
                    </>
                  )}
                </button>
              )}
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-green-500 hover:bg-green-600 text-white transition hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="hidden sm:inline">Commander via WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </button>
            </div>

            {/* Trust mini */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-base">🚚</span>
                <span>Livraison à Dakar</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-base">💳</span>
                <span>Paiement Wave / Espèces</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-base">🏪</span>
                <span>Retrait au magasin</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-base">📞</span>
                <span>Conseils expert</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Caractéristiques */}
        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-brand-blue mb-4">Caractéristiques</h2>
            <div className="bg-gray-50 rounded-2xl p-6 divide-y divide-gray-200">
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Référence</span>
                <span className="font-mono font-semibold text-gray-900">{product.ref_produit}</span>
              </div>
              {parentCat && (
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Catégorie</span>
                  <span className="font-semibold text-gray-900">{parentCat.name}</span>
                </div>
              )}
              {cat && cat.id !== parentCat?.id && (
                <div className="flex justify-between py-3">
                  <span className="text-gray-600">Sous-catégorie</span>
                  <span className="font-semibold text-gray-900">{cat.name}</span>
                </div>
              )}
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Unité de vente</span>
                <span className="font-semibold text-gray-900">{product.unit}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-600">Stock disponible</span>
                <span className="font-semibold text-gray-900">{product.stock_actual} {product.unit}</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-blue text-white rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl mb-2">Besoin de plus ?</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Pour les chantiers importants, contactez-nous pour un devis groupé avec remise volume.
              </p>
            </div>
            <a
              href={`tel:${BRAND.primaryTelDial}`}
              className="mt-4 bg-brand-gold hover:bg-brand-gold-dark text-brand-blue-dark px-4 py-3 rounded-xl font-bold text-center transition"
            >
              📞 {BRAND.phones[0]}
            </a>
          </div>
        </div>

        {/* Produits similaires */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-brand-blue mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {similar.map(p => {
                const simImg = p.image_url || getCategoryPhoto(parentCat?.name || '')
                return (
                  <Link
                    key={p.id}
                    href={`/produit/${p.id}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-brand-blue/30 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
                  >
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      {simImg ? (
                        <Image src={simImg} alt={p.designation} fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <CategoryIcon category={parentCat?.name || ''} variant="large" className="w-20 h-20" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition mb-2">
                        {p.designation}
                      </h4>
                      <div className="mt-auto">
                        <div className="font-bold text-brand-blue text-base sm:text-lg">{formatFCFA(p.selling_price)}</div>
                        <div className="text-[10px] sm:text-xs text-gray-400">{p.unit}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <Cart />
      <DevisModal />
    </main>
  )
}
