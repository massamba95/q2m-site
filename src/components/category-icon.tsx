// Illustrations SVG modernes par catégorie quincaillerie.
// Remplace les emojis (qui ne s'affichent pas toujours selon les fontes système).

import React from "react";

/**
 * Mappe le nom de catégorie vers une photo /categories/*.jpg si elle existe.
 * Désactivé tant qu'on n'a pas de vraies photos pertinentes — retourne null.
 * Quand de bonnes photos seront disponibles dans /public/categories/, on
 * réactivera le mapping ci-dessous.
 */
export function getCategoryPhoto(category: string): string | null {
  void category;
  return null;
}

type Props = {
  category: string;
  className?: string;
  /** Variante d'usage : 'large' = grosse illustration dans la card produit, 'small' = petite icône à côté du bouton catégorie */
  variant?: "large" | "small";
};

export function CategoryIcon({ category, className = "", variant = "large" }: Props) {
  // Couleur unique pour les small icons (sur fond de pill)
  const stroke = variant === "small" ? "currentColor" : "#ffffff";
  const fill = variant === "small" ? "currentColor" : "rgba(255,255,255,0.85)";
  const sw = variant === "small" ? 2 : 4;
  const dropShadow = variant === "large" ? "drop-shadow-lg" : "";

  const svgs: Record<string, JSX.Element> = {
    "Électricité": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M36 4 L18 36 L30 36 L26 60 L46 26 L34 26 Z"
              stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill} />
      </svg>
    ),
    "Éclairage": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 6 C22 6 14 14 14 24 C14 31 18 36 22 40 L22 46 L42 46 L42 40 C46 36 50 31 50 24 C50 14 42 6 32 6 Z"
              stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill} />
        <line x1="24" y1="52" x2="40" y2="52" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="26" y1="58" x2="38" y2="58" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    "Plomberie": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="20" width="20" height="24" rx="2" stroke={stroke} strokeWidth={sw} fill={fill} />
        <rect x="38" y="20" width="20" height="24" rx="2" stroke={stroke} strokeWidth={sw} fill={fill} />
        <line x1="26" y1="32" x2="38" y2="32" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <circle cx="16" cy="32" r="4" fill={stroke} />
        <circle cx="48" cy="32" r="4" fill={stroke} />
      </svg>
    ),
    "Matériaux": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 28 L32 12 L56 28 L56 56 L8 56 Z"
              stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill} />
        <rect x="20" y="34" width="10" height="14" stroke={stroke} strokeWidth={sw / 1.5} fill="none" />
        <rect x="34" y="34" width="10" height="14" stroke={stroke} strokeWidth={sw / 1.5} fill="none" />
      </svg>
    ),
    "Outillage": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="6" width="14" height="20" rx="2" stroke={stroke} strokeWidth={sw} fill={fill} />
        <rect x="26" y="26" width="6" height="32" stroke={stroke} strokeWidth={sw} fill={fill} />
        <line x1="14" y1="14" x2="22" y2="14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="36" y1="14" x2="44" y2="14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    "Peinture": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="20" width="32" height="36" rx="2" stroke={stroke} strokeWidth={sw} fill={fill} />
        <path d="M12 20 L12 14 L44 14 L44 20 Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill} />
        <path d="M44 28 L58 28 L58 12 L52 8" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="18" y1="32" x2="38" y2="32" stroke={stroke} strokeWidth={sw / 1.5} strokeLinecap="round" />
        <line x1="18" y1="40" x2="32" y2="40" stroke={stroke} strokeWidth={sw / 1.5} strokeLinecap="round" />
      </svg>
    ),
    "Quincaillerie": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="14" stroke={stroke} strokeWidth={sw} fill={fill} />
        <polygon points="32,6 38,18 26,18" fill={stroke} />
        <polygon points="32,58 38,46 26,46" fill={stroke} />
        <polygon points="6,32 18,38 18,26" fill={stroke} />
        <polygon points="58,32 46,38 46,26" fill={stroke} />
        <circle cx="32" cy="32" r="4" fill={stroke} />
      </svg>
    ),
    "Accessoires": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="10" stroke={stroke} strokeWidth={sw} fill={fill} />
        <circle cx="44" cy="44" r="10" stroke={stroke} strokeWidth={sw} fill={fill} />
        <line x1="28" y1="28" x2="36" y2="36" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </svg>
    ),
    "Consommables": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18 L32 8 L54 18 L54 50 L32 60 L10 50 Z" stroke={stroke} strokeWidth={sw} strokeLinejoin="round" fill={fill} />
        <line x1="10" y1="18" x2="32" y2="34" stroke={stroke} strokeWidth={sw} />
        <line x1="54" y1="18" x2="32" y2="34" stroke={stroke} strokeWidth={sw} />
        <line x1="32" y1="34" x2="32" y2="60" stroke={stroke} strokeWidth={sw} />
      </svg>
    ),
    "kg": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="44" height="36" rx="3" stroke={stroke} strokeWidth={sw} fill={fill} />
        <rect x="22" y="12" width="20" height="10" rx="2" stroke={stroke} strokeWidth={sw} fill={fill} />
        <text x="32" y="46" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill={stroke}>kg</text>
      </svg>
    ),
    "metre": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="24" width="52" height="16" rx="2" stroke={stroke} strokeWidth={sw} fill={fill} />
        <line x1="14" y1="24" x2="14" y2="32" stroke={stroke} strokeWidth={sw / 1.5} />
        <line x1="22" y1="24" x2="22" y2="34" stroke={stroke} strokeWidth={sw / 1.5} />
        <line x1="30" y1="24" x2="30" y2="32" stroke={stroke} strokeWidth={sw / 1.5} />
        <line x1="38" y1="24" x2="38" y2="34" stroke={stroke} strokeWidth={sw / 1.5} />
        <line x1="46" y1="24" x2="46" y2="32" stroke={stroke} strokeWidth={sw / 1.5} />
      </svg>
    ),
    "unite": (
      <svg viewBox="0 0 64 64" className={`${className} ${dropShadow}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="14" width="36" height="36" rx="4" stroke={stroke} strokeWidth={sw} fill={fill} />
        <line x1="22" y1="26" x2="42" y2="26" stroke={stroke} strokeWidth={sw / 1.5} strokeLinecap="round" />
        <line x1="22" y1="34" x2="42" y2="34" stroke={stroke} strokeWidth={sw / 1.5} strokeLinecap="round" />
        <line x1="22" y1="42" x2="34" y2="42" stroke={stroke} strokeWidth={sw / 1.5} strokeLinecap="round" />
      </svg>
    ),
  };

  // Fallback identique à "Quincaillerie"
  return svgs[category] || svgs["Quincaillerie"];
}
