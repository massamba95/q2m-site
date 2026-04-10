const categories = [
  {
    name: 'Electricite',
    icon: '⚡',
    desc: 'Cables, interrupteurs, prises, disjoncteurs et tout le materiel electrique pour vos installations.',
    items: ['Cables', 'Interrupteurs', 'Prises', 'Disjoncteurs', 'Gaines', 'Tableaux electriques'],
  },
  {
    name: 'Eclairage',
    icon: '💡',
    desc: 'Ampoules, spots, reglettes, appliques murales et solutions d\'eclairage pour tous vos espaces.',
    items: ['Ampoules LED', 'Spots', 'Reglettes', 'Appliques', 'Douilles', 'Projecteurs'],
  },
  {
    name: 'Plomberie',
    icon: '🔧',
    desc: 'Tuyaux, raccords, robinets, sanitaires et accessoires pour toutes vos installations de plomberie.',
    items: ['Tuyaux PVC', 'Raccords', 'Robinets', 'Vannes', 'Joints', 'Colles PVC'],
  },
  {
    name: 'Materiaux',
    icon: '🏗️',
    desc: 'Ciment, fer a beton, sable, gravier et tout le necessaire pour vos constructions et fondations.',
    items: ['Ciment', 'Fer a beton', 'Sable', 'Gravier', 'Briques', 'Parpaings'],
  },
  {
    name: 'Outillage',
    icon: '🛠️',
    desc: 'Outils a main et electriques pour les professionnels et les bricoleurs du quotidien.',
    items: ['Marteaux', 'Tournevis', 'Perceuses', 'Scies', 'Niveaux', 'Metres'],
  },
  {
    name: 'Peinture',
    icon: '🎨',
    desc: 'Peintures interieures et exterieures, pinceaux, rouleaux et accessoires pour vos finitions.',
    items: ['Peinture murale', 'Peinture bois', 'Pinceaux', 'Rouleaux', 'Enduits', 'Diluants'],
  },
  {
    name: 'Quincaillerie',
    icon: '🔩',
    desc: 'Vis, boulons, clous, serrures, charnieres et tous les petits accessoires indispensables.',
    items: ['Vis', 'Boulons', 'Clous', 'Serrures', 'Charnieres', 'Cadenas'],
  },
  {
    name: 'Accessoires',
    icon: '🔗',
    desc: 'Accessoires divers pour completer vos projets : fixations, colles, adhesifs et plus.',
    items: ['Fixations', 'Colles', 'Adhesifs', 'Chevilles', 'Crochets', 'Supports'],
  },
  {
    name: 'Consommables',
    icon: '📦',
    desc: 'Produits d\'usage courant pour l\'entretien et les travaux du quotidien.',
    items: ['Scotch', 'Gants', 'Masques', 'Lames', 'Papier abrasif', 'Mastic'],
  },
]

export function Catalogue() {
  return (
    <section id="catalogue" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold font-semibold text-sm uppercase tracking-wider">Catalogue</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mt-3 mb-5">
            Nos produits
          </h2>
          <p className="text-gray-600 text-lg">
            Plus de 300 references disponibles en magasin. Decouvrez nos principales categories.
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div
              key={cat.name}
              className="group relative bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-gold/30 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{cat.icon}</div>

              {/* Title & desc */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-blue transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{cat.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map(item => (
                  <span
                    key={item}
                    className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Hover accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-blue to-brand-gold rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Vous ne trouvez pas ce que vous cherchez ?</p>
          <a
            href="tel:+221763506867"
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Appelez-nous pour commander
          </a>
        </div>
      </div>
    </section>
  )
}
