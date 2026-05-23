'use client'

const items = [
  { icon: '🚚', title: 'Livraison Dakar', desc: '24h-48h · Wave OK' },
  { icon: '💳', title: 'Paiement flexible', desc: 'Wave · Orange Money · Espèces' },
  { icon: '🎯', title: 'Conseil expert', desc: '15 ans d\'expérience' },
  { icon: '⭐', title: 'Clients satisfaits', desc: '+1000 chantiers servis' },
]

export function TrustBar() {
  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(it => (
          <div key={it.title} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue text-xl flex-shrink-0">
              {it.icon}
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900">{it.title}</div>
              <div className="text-xs text-gray-500">{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
