import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo_Q2M.jpg"
                alt="Q2M"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div>
                <div className="font-bold text-lg">Q2M</div>
                <div className="text-blue-200 text-sm">Quincaillerie Maman Mareme</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Votre partenaire de confiance pour tous vos materiaux de construction et fournitures au Lac Rose, Dakar.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-gold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '#accueil', label: 'Accueil' },
                { href: '#a-propos', label: 'A propos' },
                { href: '#catalogue', label: 'Catalogue' },
                { href: '#contact', label: 'Contact' },
              ].map(l => (
                <li key={l.href}>
                  <a href={l.href} className="text-blue-200 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-gold">Contact</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>76 350 68 67</li>
              <li>77 952 59 24</li>
              <li>77 672 79 80</li>
              <li className="pt-1">Lac Rose, Dakar, Senegal</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Q2M - Quincaillerie Maman Mareme. Tous droits reserves.</p>
        </div>
      </div>
    </footer>
  )
}
