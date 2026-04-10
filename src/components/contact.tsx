'use client'

import { FadeIn, StaggerContainer, StaggerItem } from './animations'

export function Contact() {
  const contacts = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Telephone',
      values: ['76 350 68 67', '77 952 59 24', '77 672 79 80'],
      gradient: 'from-blue-500 to-brand-blue',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Adresse',
      values: ['Lac Rose', 'Dakar, Senegal'],
      gradient: 'from-brand-gold to-amber-500',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Horaires',
      values: ['Lundi - Dimanche', '8h00 - 19h00'],
      gradient: 'from-emerald-500 to-green-600',
    },
  ]

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-brand-gold font-semibold text-sm uppercase tracking-wider bg-brand-gold/10 px-4 py-1.5 rounded-full mb-4">
              Contact
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-brand-blue mt-3 mb-6">
              Ou nous trouver
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Venez nous rendre visite au Lac Rose ou contactez-nous directement.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact cards */}
          <div className="space-y-5">
            <StaggerContainer className="space-y-5">
              {contacts.map(c => (
                <StaggerItem key={c.label}>
                  <div className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <div className={`w-12 h-12 bg-gradient-to-br ${c.gradient} text-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg`}>
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 text-lg">{c.label}</h3>
                      {c.values.map(v => (
                        <p key={v} className="text-gray-600">{v}</p>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* WhatsApp CTA */}
            <FadeIn delay={0.3}>
              <a
                href="https://wa.me/221763506867"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-5 rounded-2xl font-semibold text-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/30 hover:-translate-y-1"
              >
                <svg className="w-7 h-7 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Ecrivez-nous sur WhatsApp
              </a>
            </FadeIn>
          </div>

          {/* Map */}
          <FadeIn direction="right">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden h-full min-h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.5!2d-17.233!3d14.833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDUwJzAwLjAiTiAxN8KwMTQnMDAuMCJX!5e0!3m2!1sfr!2ssn!4v1!5m2!1sfr!2ssn"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Q2M - Lac Rose, Dakar"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
