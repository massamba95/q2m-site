'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light animate-gradient" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl animate-float-slow" />

        {/* Geometric shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-32 right-[15%] w-20 h-20 border-2 border-brand-gold/20 rounded-lg"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-40 left-[10%] w-16 h-16 border-2 border-white/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[60%] right-[8%] w-12 h-12 border-2 border-brand-gold/15 rounded-lg"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-32 md:py-0 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass text-brand-gold-light px-5 py-2.5 rounded-full text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 bg-brand-gold rounded-full animate-pulse" />
              Lac Rose, Dakar, Senegal
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Quincaillerie{' '}
              <span className="text-gradient">Maman Mareme</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-blue-100/80 mb-10 max-w-lg"
            >
              Votre partenaire de confiance pour tous vos materiaux de construction,
              outillage et fournitures. Commandez en ligne, livraison ou retrait.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="#catalogue"
                className="group bg-brand-gold hover:bg-brand-gold-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-brand-gold/30 hover:-translate-y-1"
              >
                Voir le catalogue
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </a>
              <button
                onClick={() => window.dispatchEvent(new Event('open-devis'))}
                className="group glass text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/20 hover:-translate-y-1"
              >
                <svg className="w-5 h-5 inline-block mr-2 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Demander un devis
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start mt-8 text-sm text-blue-100/70"
            >
              {[
                { icon: 'M5 13l4 4L19 7', label: 'Produits de qualité' },
                { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Livraison rapide' },
                { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Retrait en magasin' },
              ].map(b => (
                <span key={b.label} className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={b.icon} />
                  </svg>
                  {b.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Logo / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-3xl scale-125 animate-pulse-glow" />
              <div className="absolute -inset-4 border-2 border-brand-gold/20 rounded-full animate-spin" style={{ animationDuration: '15s' }} />
              <div className="absolute -inset-8 border border-white/10 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
              <Image
                src="/logo_Q2M.jpg"
                alt="Q2M - Quincaillerie Maman Mareme"
                width={320}
                height={320}
                className="relative rounded-full shadow-2xl border-4 border-white/20"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mt-16 md:mt-24 max-w-2xl mx-auto md:mx-0"
        >
          {[
            { value: '300+', label: 'Produits disponibles' },
            { value: '7j/7', label: 'Toujours ouvert' },
            { value: 'N°1', label: 'Au Lac Rose' },
          ].map(stat => (
            <div key={stat.label} className="glass rounded-2xl p-4 text-center hover:bg-white/15 transition-colors">
              <div className="text-2xl sm:text-3xl font-bold text-brand-gold">{stat.value}</div>
              <div className="text-xs sm:text-sm text-blue-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
