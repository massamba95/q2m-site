import Image from 'next/image'

export function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-gold rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 md:py-0">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-brand-gold-light px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              Lac Rose, Dakar, Senegal
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Quincaillerie{' '}
              <span className="text-brand-gold">Maman Mareme</span>
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-lg">
              Votre partenaire de confiance pour tous vos materiaux de construction,
              outillage et fournitures. Qualite, prix competitifs et service de proximite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#catalogue"
                className="bg-brand-gold hover:bg-brand-gold-dark text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-all hover:shadow-lg hover:shadow-brand-gold/30"
              >
                Voir le catalogue
              </a>
              <a
                href="#contact"
                className="border-2 border-white/30 hover:border-white text-white px-8 py-3.5 rounded-full font-semibold text-lg transition-all hover:bg-white/10"
              >
                Nous contacter
              </a>
            </div>
          </div>

          {/* Logo / Visual */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-3xl scale-110" />
              <Image
                src="/logo_Q2M.jpg"
                alt="Q2M - Quincaillerie Maman Mareme"
                width={350}
                height={350}
                className="relative rounded-full shadow-2xl border-4 border-white/20"
                priority
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 md:mt-24 max-w-2xl mx-auto md:mx-0">
          {[
            { value: '300+', label: 'Produits' },
            { value: '7j/7', label: 'Ouvert' },
            { value: 'N°1', label: 'Lac Rose' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-gold">{stat.value}</div>
              <div className="text-sm text-blue-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
