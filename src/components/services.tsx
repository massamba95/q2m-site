'use client'

import { motion } from 'framer-motion'

const services = [
  {
    icon: '🚚',
    title: 'Livraison à Dakar',
    desc: 'Livraison en 24h-48h dans toute la région de Dakar. Tarifs adaptés selon le volume. Possibilité de chargement direct au magasin.',
  },
  {
    icon: '📋',
    title: 'Devis chantier',
    desc: 'Envoyez-nous votre liste de matériaux par WhatsApp, on vous fait un devis groupé avec remise volume.',
  },
  {
    icon: '🎯',
    title: 'Conseil expert',
    desc: '15 ans d\'expérience à votre service. Besoin d\'un avis sur la quantité, la marque, la technique ? Demandez-nous.',
  },
]

export function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-3">
            Services Q2M
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
            Plus qu&apos;une simple quincaillerie
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition"
            >
              <div className="w-14 h-14 bg-brand-blue rounded-xl flex items-center justify-center text-2xl mb-5 text-white">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
