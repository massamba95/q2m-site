'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuoteCart, whatsappQuoteUrl } from '@/lib/quote-cart'

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA'
}

export function QuoteCart() {
  const { items, totalItems, totalAmount, updateQuantity, removeItem, clearCart } = useQuoteCart()
  const [open, setOpen] = useState(false)
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')

  if (totalItems === 0 && !open) return null

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full pl-5 pr-6 py-3.5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group"
            aria-label="Voir le devis"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-brand-blue">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs text-blue-100">Mon devis</span>
              <span className="font-bold text-sm">{formatFCFA(totalAmount)}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Drawer overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="bg-brand-blue text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Ma demande de devis</h3>
                  <p className="text-blue-200 text-sm">{totalItems} produit(s) selectionne(s)</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white hover:bg-white/10 rounded-full p-2 transition-colors"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p>Aucun produit selectionne</p>
                    <p className="text-sm mt-2">Ajoutez des produits depuis le catalogue</p>
                  </div>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 leading-snug">{item.designation}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">{item.ref_produit}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:bg-red-50 rounded-lg p-1.5 transition-colors flex-shrink-0"
                          aria-label="Retirer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a2 2 0 012-2h2a2 2 0 012 2v3" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-brand-blue p-1.5 transition-colors"
                            aria-label="Diminuer"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.quantity}
                            onChange={e => updateQuantity(item.id, parseFloat(e.target.value) || 0)}
                            className="w-14 text-center text-sm font-semibold focus:outline-none bg-transparent"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-brand-blue p-1.5 transition-colors"
                            aria-label="Augmenter"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{formatFCFA(item.selling_price)} / {item.unit}</p>
                          <p className="font-bold text-brand-blue text-sm">{formatFCFA(item.quantity * item.selling_price)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-100 bg-white p-4 space-y-3">
                  {/* Contact info */}
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Votre nom"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                    <input
                      type="tel"
                      placeholder="Telephone"
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                    />
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-baseline border-t border-gray-100 pt-3">
                    <span className="text-gray-600">Total indicatif</span>
                    <span className="text-2xl font-bold text-brand-blue">{formatFCFA(totalAmount)}</span>
                  </div>

                  {/* Send WhatsApp */}
                  <a
                    href={whatsappQuoteUrl(items, clientName, clientPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-green-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Envoyer la demande de devis
                  </a>

                  <button
                    onClick={() => { if (confirm('Vider votre devis ?')) clearCart() }}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors w-full text-center py-1"
                  >
                    Vider le devis
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
