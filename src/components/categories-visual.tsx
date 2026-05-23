'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/slugify'

interface Category {
  id: string
  name: string
  parent_id: string | null
}

const META: Record<string, { icon: string; gradient: string; desc: string }> = {
  'Matériaux':                 { icon: '🏗️', gradient: 'from-gray-700 to-slate-800',   desc: 'Ciment, fer, parpaings...' },
  'Plomberie':                 { icon: '🔧', gradient: 'from-blue-500 to-cyan-600',    desc: 'Tuyaux, robinets, joints...' },
  'Électricité':               { icon: '⚡', gradient: 'from-yellow-500 to-orange-500', desc: 'Câbles, prises, disjoncteurs...' },
  'Outillage':                 { icon: '🛠️', gradient: 'from-red-500 to-rose-600',     desc: 'Marteau, scies, tournevis...' },
  'Peinture & revêtement':     { icon: '🎨', gradient: 'from-purple-500 to-violet-600', desc: 'Pots, rouleaux, pinceaux...' },
  'Éclairage':                 { icon: '💡', gradient: 'from-amber-400 to-yellow-500', desc: 'Ampoules LED, plafonniers...' },
  'Sécurité & accessoires':    { icon: '🦺', gradient: 'from-teal-500 to-emerald-600', desc: 'Chaussures, gants, attaches...' },
  'Quincaillerie & serrurerie':{ icon: '🔩', gradient: 'from-brand-blue to-blue-600',  desc: 'Verrous, serrures, vis...' },
  'Consommables divers':       { icon: '📦', gradient: 'from-stone-500 to-gray-600',   desc: 'Petits accessoires divers' },
}

export function CategoriesVisual() {
  const [parents, setParents] = useState<Category[]>([])

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('categories')
        .select('id, name, parent_id')
        .is('parent_id', null)
        .order('name')
      setParents((data as Category[]) || [])
    }
    load()
  }, [])

  function selectCategory(id: string) {
    const cat = parents.find(c => c.id === id)
    if (!cat) return
    window.location.href = `/categorie/${slugify(cat.name)}`
  }

  // Exclure "Consommables divers" du visuel d'accueil (trop générique)
  const displayed = parents.filter(p => p.name !== 'Consommables divers')

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-3">
            Notre catalogue
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Explorez par{' '}
            <span className="bg-gradient-to-r from-brand-gold to-amber-300 bg-clip-text text-transparent">
              catégorie
            </span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Tout ce qu&apos;il vous faut pour vos chantiers en BTP, plomberie, électricité et bien plus.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayed.map((cat, i) => {
            const meta = META[cat.name] || { icon: '📦', gradient: 'from-gray-400 to-gray-500', desc: '' }
            return (
              <motion.button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${meta.gradient} hover:shadow-2xl transition-all text-left`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                  {meta.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-bold text-white text-lg">{cat.name}</div>
                  <div className="text-xs text-gray-200 mt-1">{meta.desc}</div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
