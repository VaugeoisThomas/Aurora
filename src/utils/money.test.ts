import { expect, test, describe } from 'vitest'
import { parseEuroToCents } from './money'

describe('parseEuroToCents', () => {
  test('convertit un montant négatif avec une virgule en centime', () => {
    expect(parseEuroToCents('-600,59')).toBe(-60059)
  })

  test('complète une seule décimale en centimes', () => {
    expect(parseEuroToCents('5.2')).toBe(520)
  })

  test('accepte un montant nul', () => {
    expect(parseEuroToCents('0')).toBe(0)
  })

  test('refuse plus de deux décimales', () => {
    expect(parseEuroToCents('12,345')).toBeNull()
  })

  test('ignore les espaces aux extrémités', () => {
    expect(parseEuroToCents(' 12,34 ')).toBe(1234)
  })

  test('refuse une saisie vide ou non numérique', () => {
    expect(parseEuroToCents('')).toBeNull()
    expect(parseEuroToCents('abc')).toBeNull()
  })

  test('accepte les limites des entiers exacts', () => {
    expect(parseEuroToCents('90071992547409,91')).toBe(Number.MAX_SAFE_INTEGER)
    expect(parseEuroToCents('-90071992547409,91')).toBe(Number.MIN_SAFE_INTEGER)
  })

  test('refuse un centime au-delà des limites', () => {
    expect(parseEuroToCents('90071992547409,92')).toBeNull()
    expect(parseEuroToCents('-90071992547409,92')).toBeNull()
  })
})
