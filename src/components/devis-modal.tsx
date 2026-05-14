'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'

interface Product {
  id: string
  ref_produit: string
  designation: string
  selling_price: number
  unit: string
}

interface DevisLine {
  product: Product
  quantity: number
}

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA'
}

export function DevisModal() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [lines, setLines] = useState<DevisLine[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    function onOpen() { setOpen(true) }
    window.addEventListener('open-devis', onOpen)
    return () => window.removeEventListener('open-devis', onOpen)
  }, [])

  useEffect(() => {
    if (open && products.length === 0) {
      supabase
        .from('products')
        .select('id, ref_produit, designation, selling_price, unit')
        .eq('is_active', true)
        .order('designation')
        .then(({ data }) => setProducts((data || []) as Product[]))
    }
  }, [open, products.length])

  const searchResults = search.length > 0
    ? products
        .filter(p =>
          !lines.some(l => l.product.id === p.id) &&
          (p.designation.toLowerCase().includes(search.toLowerCase()) ||
           p.ref_produit.toLowerCase().includes(search.toLowerCase()))
        )
        .slice(0, 8)
    : []

  function addLine(product: Product) {
    setLines(prev => [...prev, { product, quantity: 1 }])
    setSearch('')
  }

  function updateQty(id: string, qty: number) {
    if (qty <= 0) {
      setLines(prev => prev.filter(l => l.product.id !== id))
    } else {
      setLines(prev => prev.map(l => l.product.id === id ? { ...l, quantity: qty } : l))
    }
  }

  function removeLine(id: string) {
    setLines(prev => prev.filter(l => l.product.id !== id))
  }

  const total = lines.reduce((s, l) => s + l.quantity * l.product.selling_price, 0)
  const canSend = name.trim() !== '' && phone.trim() !== '' && lines.length > 0

  function buildWhatsappUrl() {
    const productLines = lines.map((l, i) => {
      return `${i + 1}. ${l.product.designation} (${l.product.ref_produit})
   Quantité : ${l.quantity} ${l.product.unit}` +
        (l.product.selling_price > 0 ? `\n   Prix indicatif : ${formatFCFA(l.product.selling_price)} / ${l.product.unit}` : '')
    }).join('\n\n')

    let msg = `Bonjour Q2M, je souhaite une demande de devis.\n\n`
    msg += `Nom : ${name}\n`
    msg += `Téléphone : ${phone}\n\n`
    msg += `Produits :\n\n${productLines}`
    if (total > 0) msg += `\n\nTotal indicatif : ${formatFCFA(total)}`
    if (notes.trim()) msg += `\n\nNote : ${notes.trim()}`
    msg += `\n\nMerci de me faire une proposition de prix, la disponibilité et le délai.`
    return `https://wa.me/221763506867?text=${encodeURIComponent(msg)}`
  }

  function close() {
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[5%] bottom-[5%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-lg z-[60] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-blue text-white px-6 py-5 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold">Demande de devis</h3>
                <p className="text-blue-200 text-sm">Choisissez vos produits, on vous fait une offre</p>
              </div>
              <button onClick={close} className="text-white hover:bg-white/10 rounded-full p-2 transition-colors" aria-label="Fermer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Client info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Nom complet *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Téléphone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="ex: 77 123 45 67"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                  />
                </div>
              </div>

              {/* Product search */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Ajouter des produits</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Rechercher un produit..."
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-auto">
                      {searchResults.map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => addLine(p)}
                          className="w-full text-left px-4 py-2.5 hover:bg-blue-50 border-b last:border-0 transition-colors"
                        >
                          <p className="text-sm font-medium">{p.designation}</p>
                          <p className="text-xs text-gray-400">
                            {p.ref_produit}
                            {p.selling_price > 0 ? ` — ${formatFCFA(p.selling_price)} / ${p.unit}` : ''}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Selected products */}
              {lines.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                  Aucun produit sélectionné — utilisez la recherche ci-dessus
                </div>
              ) : (
                <div className="space-y-2">
                  {lines.map(l => (
                    <div key={l.product.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-snug">{l.product.designation}</p>
                          <p className="text-xs text-gray-400">{l.product.ref_produit}</p>
                        </div>
                        <button onClick={() => removeLine(l.product.id)} className="text-red-500 hover:bg-red-50 rounded p-1 flex-shrink-0" aria-label="Retirer">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-1">
                          <button onClick={() => updateQty(l.product.id, l.quantity - 1)} className="text-gray-500 hover:text-brand-blue p-1.5" aria-label="Diminuer">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                          </button>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={l.quantity}
                            onChange={e => updateQty(l.product.id, parseFloat(e.target.value) || 0)}
                            className="w-12 text-center text-sm font-semibold focus:outline-none bg-transparent"
                          />
                          <button onClick={() => updateQty(l.product.id, l.quantity + 1)} className="text-gray-500 hover:text-brand-blue p-1.5" aria-label="Augmenter">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                          </button>
                          <span className="text-xs text-gray-400 pr-2">{l.product.unit}</span>
                        </div>
                        {l.product.selling_price > 0 && (
                          <span className="text-sm font-semibold text-brand-blue">
                            {formatFCFA(l.quantity * l.product.selling_price)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Note (optionnel)</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Précisions, délai souhaité, projet..."
                  rows={2}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-white p-4 flex-shrink-0 space-y-2">
              {total > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total indicatif</span>
                  <span className="font-bold text-brand-blue">{formatFCFA(total)}</span>
                </div>
              )}
              <a
                href={canSend ? buildWhatsappUrl() : undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { if (!canSend) e.preventDefault(); else close() }}
                className={`flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl font-semibold transition-all ${
                  canSend
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Envoyer la demande via WhatsApp
              </a>
              {!canSend && (
                <p className="text-xs text-gray-400 text-center">
                  Renseignez votre nom, téléphone et au moins un produit
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
