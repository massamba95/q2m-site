'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from './supabase'

export interface CartItem {
  id: string
  ref_produit: string
  designation: string
  selling_price: number
  unit: string
  category_name: string
  quantity: number
}

const STORAGE_KEY = 'q2m_cart'
const EVENT_NAME = 'q2m-cart-updated'

function readCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(EVENT_NAME))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

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

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, qty = 1) => {
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

export interface CheckoutInfo {
  customerName: string
  customerPhone: string
  customerAddress: string
  deliveryMode: 'retrait' | 'livraison'
  notes: string
}

export async function placeOrder(items: CartItem[], info: CheckoutInfo): Promise<{ orderNumber: string | null; error: string | null }> {
  const payloadItems = items.map(it => ({
    product_id: it.id,
    ref: it.ref_produit,
    designation: it.designation,
    quantity: it.quantity,
    unit_price: it.selling_price,
  }))

  const { data, error } = await supabase.rpc('place_order', {
    p_customer_name: info.customerName,
    p_customer_phone: info.customerPhone,
    p_customer_address: info.customerAddress || null,
    p_delivery_mode: info.deliveryMode,
    p_notes: info.notes || null,
    p_items: payloadItems,
  })

  if (error) {
    return { orderNumber: null, error: error.message }
  }
  return { orderNumber: data as string, error: null }
}
