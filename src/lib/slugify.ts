/**
 * Convertit un nom de catégorie en slug URL-safe.
 * Ex: "Électricité" → "electricite"
 * Ex: "Quincaillerie & serrurerie" → "quincaillerie-serrurerie"
 * Ex: "Peinture & revêtement" → "peinture-revetement"
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // enlève les accents
    .replace(/[^a-z0-9]+/g, "-") // remplace tout ce qui n'est pas alphanumérique par -
    .replace(/^-+|-+$/g, ""); // trim les - en début/fin
}
