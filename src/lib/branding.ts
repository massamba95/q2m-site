/**
 * Centralized brand configuration for the public website.
 *
 * Change ONLY this file (and the logo in /public/) to rebrand the site
 * for a different business.
 */
export const BRAND = {
  name: 'Q2M',
  fullName: 'Quincaillerie Maman Marème',
  tagline: 'Quincaillerie',
  slogan: 'Construisons Ensemble l\'Avenir',
  address: 'Lac Rose, Dakar, Sénégal',
  city: 'Lac Rose, Dakar',
  phones: ['76 350 68 67', '77 952 59 24', '77 672 79 80'],
  /** International format without + (for tel: and wa.me links) */
  primaryTelDial: '+221763506867',
  whatsappNumber: '221763506867',
  logoUrl: '/logo_Q2M.jpg',
}

export const BRAND_PHONES = BRAND.phones.join(' / ')
