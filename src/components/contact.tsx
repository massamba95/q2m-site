export function Contact() {
  const contacts = [
    { icon: '📞', label: 'Telephone', values: ['76 350 68 67', '77 952 59 24', '77 672 79 80'] },
    { icon: '📍', label: 'Adresse', values: ['Lac Rose', 'Dakar, Senegal'] },
    { icon: '🕐', label: 'Horaires', values: ['Lundi - Dimanche', '8h00 - 19h00'] },
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-blue mt-3 mb-5">
            Ou nous trouver
          </h2>
          <p className="text-gray-600 text-lg">
            Venez nous rendre visite au Lac Rose ou contactez-nous directement par telephone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact cards */}
          <div className="space-y-6">
            {contacts.map(c => (
              <div
                key={c.label}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-5"
              >
                <div className="text-3xl">{c.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{c.label}</h3>
                  {c.values.map(v => (
                    <p key={v} className="text-gray-600">{v}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/221763506867"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-colors shadow-sm"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ecrivez-nous sur WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.5!2d-17.233!3d14.833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDUwJzAwLjAiTiAxN8KwMTQnMDAuMCJX!5e0!3m2!1sfr!2ssn!4v1!5m2!1sfr!2ssn"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation Q2M - Lac Rose, Dakar"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
