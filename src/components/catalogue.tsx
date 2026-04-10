'use client'

import { FadeIn, StaggerContainer, StaggerItem } from './animations'

const categories = [
  {
    name: 'Electricite',
    icon: '⚡',
    desc: 'Cables, interrupteurs, prises, disjoncteurs et tout le materiel electrique.',
    items: ['Cables', 'Interrupteurs', 'Prises', 'Disjoncteurs', 'Gaines', 'Tableaux'],
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Eclairage',
    icon: '💡',
    desc: 'Ampoules, spots, reglettes et solutions d\'eclairage pour tous vos espaces.',
    items: ['Ampoules LED', 'Spots', 'Reglettes', 'Appliques', 'Douilles', 'Projecteurs'],
    gradient: 'from-amber-400 to-yellow-500',
  },
  {
    name: 'Plomberie',
    icon: '🔧',
    desc: 'Tuyaux, raccords, robinets et accessoires pour vos installations.',
    items: ['Tuyaux PVC', 'Raccords', 'Robinets', 'Vannes', 'Joints', 'Colles PVC'],
    gradient: 'from-blue-400 to-cyan-500',
  },
  {
    name: 'Materiaux',
    icon: '🏗️',
    desc: 'Ciment, fer a beton et tout le necessaire pour vos constructions.',
    items: ['Ciment', 'Fer a beton', 'Sable', 'Gravier', 'Briques', 'Parpaings'],
    gradient: 'from-gray-500 to-slate-600',
  },
  {
    name: 'Outillage',
    icon: '🛠️',
    desc: 'Outils a main et electriques pour professionnels et bricoleurs.',
    items: ['Marteaux', 'Tournevis', 'Perceuses', 'Scies', 'Niveaux', 'Metres'],
    gradient: 'from-red-400 to-rose-500',
  },
  {
    name: 'Peinture',
    icon: '🎨',
    desc: 'Peintures, pinceaux, rouleaux et accessoires pour vos finitions.',
    items: ['Peinture murale', 'Peinture bois', 'Pinceaux', 'Rouleaux', 'Enduits', 'Diluants'],
    gradient: 'from-purple-400 to-violet-500',
  },
  {
    name: 'Quincaillerie',
    icon: '🔩',
    desc: 'Vis, boulons, clous, serrures et tous les accessoires indispensables.',
    items: ['Vis', 'Boulons', 'Clous', 'Serrures', 'Charnieres', 'Cadenas'],
    gradient: 'from-brand-blue to-blue-600',
  },
  {
    name: 'Accessoires',
    icon: '🔗',
    desc: 'Fixations, colles, adhesifs et accessoires pour completer vos projets.',
    items: ['Fixations', 'Colles', 'Adhesifs', 'Chevilles', 'Crochets', 'Supports'],
    gradient: 'from-teal-400 to-emerald-500',
  },
  {
    name: 'Consommables',
    icon: '📦',
    desc: 'Produits d\'usage courant pour l\'entretien et les travaux du quotidien.',
    items: ['Scotch', 'Gants', 'Masques', 'Lames', 'Papier abrasif', 'Mastic'],
    gradient: 'from-brand-gold to-amber-500',
  },
]

export function Catalogue() {
  return (
    <section id="catalogue" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-brand-blue/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-wider bg-brand-gold/10 px-4 py-1.5 rounded-full mb-4">
              Catalogue
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-blue mt-3 mb-6">
              Nos produits
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Plus de <strong className="text-brand-blue">300 references</strong> disponibles en magasin.
              Decouvrez nos principales categories.
            </p>
          </div>
        </FadeIn>

        {/* Categories grid */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <StaggerItem key={cat.name}>
              <div className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full overflow-hidden">
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                {/* Icon with gradient bg */}
                <div className={`w-14 h-14 bg-gradient-to-br ${cat.gradient} rounded-2xl flex items-center justify-center mb-4 text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>

                {/* Title & desc */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{cat.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map(item => (
                    <span
                      key={item}
                      className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-blue-50 group-hover:text-brand-blue transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-16">
            <div className="inline-block bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 sm:p-10">
              <p className="text-gray-600 text-lg mb-5">Vous ne trouvez pas ce que vous cherchez ?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+221763506867"
                  className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Appelez-nous
                </a>
                <a
                  href="https://wa.me/221763506867"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
