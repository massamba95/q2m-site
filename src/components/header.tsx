'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BRAND } from '@/lib/branding'
import { useCart } from '@/lib/cart'

/**
 * Header principal : Logo + barre de recherche + Compte + Panier.
 * Sous le TopBar et au-dessus du MegaMenu.
 */
export function Header() {
  const [search, setSearch] = useState('')
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!search.trim()) return
    // Si déjà sur /catalogue, on émet juste l'event. Sinon on navigue.
    if (typeof window !== 'undefined' && window.location.pathname === '/catalogue') {
      window.dispatchEvent(new CustomEvent('search-products', { detail: search.trim() }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.href = `/catalogue?q=${encodeURIComponent(search.trim())}`
    }
  }

  function openCart() {
    window.dispatchEvent(new Event('open-cart'))
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        <a href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <Image
            src={BRAND.logoUrl}
            alt={BRAND.name}
            width={56}
            height={56}
            className="rounded-full object-cover shadow-sm"
          />
          <div className="hidden sm:block">
            <div className="font-extrabold text-brand-blue leading-tight text-lg">{BRAND.name}</div>
            <div className="text-[10px] text-gray-500 leading-tight">{BRAND.fullName} · {BRAND.city}</div>
          </div>
        </a>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 relative hidden md:block">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher : ciment, fer 8, peinture, robinet..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition"
          />
          <button type="submit" aria-label="Rechercher" className="absolute left-4 top-3.5 text-gray-400 hover:text-brand-blue transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={openCart}
            className="relative flex flex-col items-center justify-center px-3 hover:text-brand-blue transition"
            aria-label="Panier"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] text-gray-500 mt-0.5">Panier</span>
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm"
          />
          <button type="submit" aria-label="Rechercher" className="absolute left-3 top-3 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </button>
        </form>
      </div>
    </header>
  )
}
