'use client'

import { FadeIn, StaggerContainer, StaggerItem } from './animations'

export function About() {
  const values = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Qualite garantie',
      desc: 'Des produits selectionnes aupres de fournisseurs de confiance pour assurer durabilite et fiabilite.',
      color: 'from-blue-500 to-brand-blue',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Prix competitifs',
      desc: 'Les meilleurs prix de la region pour vos projets de construction et de renovation.',
      color: 'from-brand-gold to-amber-500',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Service de proximite',
      desc: 'Une equipe disponible et a l\'ecoute, prete a vous conseiller pour tous vos besoins.',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Disponibilite',
      desc: 'Ouvert 7 jours sur 7 pour repondre a vos besoins urgents et planifies.',
      color: 'from-purple-500 to-violet-600',
    },
  ]

  return (
    <section id="a-propos" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-wider bg-brand-gold/10 px-4 py-1.5 rounded-full mb-4">
              A propos
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-blue mt-3 mb-6">
              Votre quincaillerie de confiance
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Depuis notre implantation au Lac Rose, <strong className="text-brand-blue">Q2M - Quincaillerie Maman Mareme</strong> accompagne
              les particuliers et les professionnels dans leurs projets de construction et d&apos;amenagement.
            </p>
          </div>
        </FadeIn>

        {/* Values */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(v => (
            <StaggerItem key={v.title}>
              <div className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 h-full">
                <div className={`w-14 h-14 bg-gradient-to-br ${v.color} text-white rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
