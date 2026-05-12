'use client'

import { useEffect, useState, useCallback } from 'react'

export interface QuoteItem {
  id: string
  ref_produit: string
  designation: string
  selling_price: number
  unit: string
  category_name: string
  quantity: number
}

const STORAGE_KEY = 'q2m_quote_cart'
const EVENT_NAME = 'q2m-cart-updated'

function readCart(): QuoteItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(items: QuoteItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT_NAME))
}

export function useQuoteCart() {
  const [items, setItems] = useState<QuoteItem[]>([])

  useEffect(() => {
    setItems(readCart())
    function onUpdate() { setItems(readCart()) }
    window.addEventListener(EVENT_NAME, onUpdate)
    window.addEventListener('storage', onUpdate)
    return () => {
      window.removeEventListener(EVENT_NAME, onUpdate)
      window.removeEventListener('storage', onUpdate)
    }
  }, [])

  const addItem = useCallback((item: Omit<QuoteItem, 'quantity'>, qty = 1) => {
    const current = readCart()
    const existing = current.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += qty
      writeCart(current)
    } else {
      writeCart([...current, { ...item, quantity: qty }])
    }
  }, [])

  const updateQuantity = useCallback((id: string, qty: number) => {
    const current = readCart()
    const item = current.find(i => i.id === id)
    if (!item) return
    if (qty <= 0) {
      writeCart(current.filter(i => i.id !== id))
    } else {
      item.quantity = qty
      writeCart(current)
    }
  }, [])

  const removeItem = useCallback((id: string) => {
    writeCart(readCart().filter(i => i.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    writeCart([])
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalAmount = items.reduce((sum, i) => sum + i.quantity * i.selling_price, 0)

  return { items, totalItems, totalAmount, addItem, updateQuantity, removeItem, clearCart }
}

export function buildWhatsappQuoteMessage(items: QuoteItem[], clientName?: string, clientPhone?: string) {
  const fmt = (n: number) =>
    new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n)) + ' FCFA'

  const lines = items.map((it, i) => {
    const total = it.quantity * it.selling_price
    return `${i + 1}. ${it.designation} (${it.ref_produit})
   Quantite: ${it.quantity} ${it.unit}
   Prix indicatif: ${fmt(it.selling_price)} / ${it.unit}
   Sous-total: ${fmt(total)}`
  }).join('\n\n')

  const total = items.reduce((s, i) => s + i.quantity * i.selling_price, 0)

  let header = `Bonjour Q2M, je souhaite une demande de devis pour les produits suivants :\n\n`
  if (clientName || clientPhone) {
    header = `Bonjour Q2M, je souhaite une demande de devis.\n\n`
    if (clientName) header += `Nom : ${clientName}\n`
    if (clientPhone) header += `Telephone : ${clientPhone}\n`
    header += `\nProduits :\n\n`
  }

  return header +
    lines +
    `\n\nTotal indicatif : ${fmt(total)}\n\n` +
    `Pouvez-vous me confirmer le prix definitif, la disponibilite et le delai ?`
}

export function whatsappQuoteUrl(items: QuoteItem[], clientName?: string, clientPhone?: string) {
  const msg = buildWhatsappQuoteMessage(items, clientName, clientPhone)
  return `https://wa.me/221763506867?text=${encodeURIComponent(msg)}`
}
