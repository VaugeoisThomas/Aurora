/**
 * Convertit des euros en centimes entiers avec BigInt pour préserver la précision.
 * @param value - Montant signé, virgule ou point, deux décimales maximum.
 * @returns Centimes ou null si invalide ; zéro est valide.
 * @example Résultat attendu : parseEuroToCents('-600,59') → -60059.
 */
export function parseEuroToCents(value: string): number | null {
  // Prépare le texte : " -600,59 " devient "-600.59".
  const normalized = value.trim().replace(',', '.')

  if (!/^[+-]?\d+(?:\.\d{1,2})?$/.test(normalized)) {
    return null
  }

  // Mémorise le signe, puis sépare euros et décimales sans le signe.
  const isNegative = normalized.startsWith('-')
  const unsigned = normalized.replace(/^[+-]/, '')
  const [euros, decimals = ''] = unsigned.split('.')

  // Complète à droite : "" → "00", "2" → "20", "59" → "59".
  // Exemple : 600 × 100 + 59 = 60059 centimes. Le suffixe n désigne un BigInt.
  const cents = BigInt(euros) * 100n + BigInt(decimals.padEnd(2, '0'))

  // Rétablit le signe : un solde initial négatif est autorisé.
  const signedCents = isNegative ? -cents : cents

  // Refuse les entiers que number ne pourrait pas représenter exactement.
  if (
    signedCents > BigInt(Number.MAX_SAFE_INTEGER) ||
    signedCents < BigInt(Number.MIN_SAFE_INTEGER)
  ) {
    return null
  }
  return Number(signedCents)
}
