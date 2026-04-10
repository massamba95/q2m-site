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
              outillage et fournitures.
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
              <a
                href="https://wa.me/221763506867"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/20 hover:-translate-y-1"
              >
                <svg className="w-5 h-5 inline-block mr-2 -mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
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
