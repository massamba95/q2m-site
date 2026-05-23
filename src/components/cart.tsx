'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useCart, placeOrder, type CheckoutInfo } from '@/lib/cart'

function formatFCFA(n: number) {
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA'
}

type Step = 'cart' | 'checkout' | 'done'

export function Cart() {
  const { items, totalItems, totalAmount, updateQuantity, removeItem, clearCart } = useCart()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('cart')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [orderNumber, setOrderNumber] = useState('')

  const [info, setInfo] = useState<CheckoutInfo>({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    deliveryMode: 'retrait',
    notes: '',
  })

  // Écouter l'event 'open-cart' émis par le bouton panier du header
  useEffect(() => {
    function onOpenCart() { setOpen(true) }
    window.addEventListener('open-cart', onOpenCart)
    return () => window.removeEventListener('open-cart', onOpenCart)
  }, [])

  function closeDrawer() {
    setOpen(false)
    // Reset to cart step after close animation
    setTimeout(() => {
      if (step === 'done') {
        setStep('cart')
        setOrderNumber('')
        setInfo({ customerName: '', customerPhone: '', customerAddress: '', deliveryMode: 'retrait', notes: '' })
      }
    }, 300)
  }

  async function handleSubmit() {
    if (!info.customerName.trim() || !info.customerPhone.trim()) {
      setError('Le nom et le téléphone sont obligatoires')
      return
    }
    if (info.deliveryMode === 'livraison' && !info.customerAddress.trim()) {
      setError('L\'adresse de livraison est obligatoire')
      return
    }
    setSubmitting(true)
    setError('')
    const { orderNumber: num, error: err } = await placeOrder(items, info)
    setSubmitting(false)
    if (err) {
      setError('Erreur lors de l\'envoi de la commande. Réessayez ou contactez-nous par téléphone.')
      return
    }
    setOrderNumber(num || '')
    clearCart()
    setStep('done')
  }

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {totalItems > 0 && !open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-full pl-5 pr-6 py-3.5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            aria-label="Voir le panier"
          >
            <div className="relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-brand-blue">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs text-blue-100">Mon panier</span>
              <span className="font-bold text-sm">{formatFCFA(totalAmount)}</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
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
                  <h3 className="text-xl font-bold">
                    {step === 'cart' && 'Mon panier'}
                    {step === 'checkout' && 'Vos coordonnées'}
                    {step === 'done' && 'Commande envoyée'}
                  </h3>
                  {step === 'cart' && <p className="text-blue-200 text-sm">{totalItems} article(s)</p>}
                  {step === 'checkout' && <p className="text-blue-200 text-sm">Étape finale</p>}
                </div>
                <button onClick={closeDrawer} className="text-white hover:bg-white/10 rounded-full p-2 transition-colors" aria-label="Fermer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* STEP: CART */}
              {step === 'cart' && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {items.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p>Votre panier est vide</p>
                      </div>
                    ) : (
                      items.map(item => (
                        <div key={item.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <div className="flex items-start gap-3 mb-2">
                            {item.image_url && (
                              <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                <Image
                                  src={item.image_url}
                                  alt={item.designation}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-sm text-gray-900 leading-snug">{item.designation}</h4>
                              <p className="text-xs text-gray-400 mt-0.5">{item.ref_produit}</p>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 rounded-lg p-1.5 transition-colors flex-shrink-0" aria-label="Retirer">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a2 2 0 012-2h2a2 2 0 012 2v3" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-1">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-brand-blue p-1.5 transition-colors" aria-label="Diminuer">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                              </button>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.quantity}
                                onChange={e => updateQuantity(item.id, parseFloat(e.target.value) || 0)}
                                className="w-14 text-center text-sm font-semibold focus:outline-none bg-transparent"
                              />
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-brand-blue p-1.5 transition-colors" aria-label="Augmenter">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
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

                  {items.length > 0 && (
                    <div className="border-t border-gray-100 bg-white p-4 space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-600">Total</span>
                        <span className="text-2xl font-bold text-brand-blue">{formatFCFA(totalAmount)}</span>
                      </div>
                      <button
                        onClick={() => { setStep('checkout'); setError('') }}
                        className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      >
                        Passer la commande &rarr;
                      </button>
                      <button onClick={() => { if (confirm('Vider le panier ?')) clearCart() }} className="text-xs text-gray-400 hover:text-red-500 transition-colors w-full text-center py-1">
                        Vider le panier
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* STEP: CHECKOUT */}
              {step === 'checkout' && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nom complet *</label>
                      <input
                        type="text"
                        value={info.customerName}
                        onChange={e => setInfo(i => ({ ...i, customerName: e.target.value }))}
                        placeholder="Votre nom"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Téléphone *</label>
                      <input
                        type="tel"
                        value={info.customerPhone}
                        onChange={e => setInfo(i => ({ ...i, customerPhone: e.target.value }))}
                        placeholder="ex: 77 123 45 67"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Mode de réception</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setInfo(i => ({ ...i, deliveryMode: 'retrait' }))}
                          className={`px-3 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            info.deliveryMode === 'retrait' ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          🏪 Retrait magasin
                        </button>
                        <button
                          type="button"
                          onClick={() => setInfo(i => ({ ...i, deliveryMode: 'livraison' }))}
                          className={`px-3 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                            info.deliveryMode === 'livraison' ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          🚚 Livraison
                        </button>
                      </div>
                    </div>

                    {info.deliveryMode === 'livraison' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Adresse de livraison *</label>
                        <input
                          type="text"
                          value={info.customerAddress}
                          onChange={e => setInfo(i => ({ ...i, customerAddress: e.target.value }))}
                          placeholder="Quartier, repères..."
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Note (optionnel)</label>
                      <textarea
                        value={info.notes}
                        onChange={e => setInfo(i => ({ ...i, notes: e.target.value }))}
                        placeholder="Précisions sur votre commande..."
                        rows={2}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm resize-none"
                      />
                    </div>

                    {/* Order summary */}
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase mb-2">Récapitulatif</p>
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm py-0.5">
                          <span className="text-gray-600 truncate pr-2">{item.quantity} × {item.designation}</span>
                          <span className="font-medium flex-shrink-0">{formatFCFA(item.quantity * item.selling_price)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between border-t border-gray-200 mt-2 pt-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-brand-blue">{formatFCFA(totalAmount)}</span>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                      💰 Paiement {info.deliveryMode === 'livraison' ? 'à la livraison' : 'au retrait en magasin'} — espèces, Wave ou Orange Money.
                    </div>

                    {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                  </div>

                  <div className="border-t border-gray-100 bg-white p-4 space-y-2">
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="w-full bg-brand-gold hover:bg-brand-gold-dark text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60"
                    >
                      {submitting ? 'Envoi...' : 'Confirmer la commande'}
                    </button>
                    <button onClick={() => { setStep('cart'); setError('') }} className="text-sm text-gray-500 hover:text-gray-700 w-full text-center py-1">
                      &larr; Retour au panier
                    </button>
                  </div>
                </>
              )}

              {/* STEP: DONE */}
              {step === 'done' && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Commande envoyée !</h3>
                  <p className="text-gray-600 mb-4">
                    Votre commande <strong className="text-brand-blue">{orderNumber}</strong> a bien été reçue.
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Nous vous contacterons rapidement au numéro indiqué pour confirmer la disponibilité et organiser
                    {info.deliveryMode === 'livraison' ? ' la livraison' : ' le retrait'}.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-4 w-full mb-6">
                    <p className="text-xs text-gray-500">Notez votre numéro de commande</p>
                    <p className="text-lg font-bold text-brand-blue mt-1">{orderNumber}</p>
                  </div>
                  <button
                    onClick={closeDrawer}
                    className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    Continuer mes achats
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
