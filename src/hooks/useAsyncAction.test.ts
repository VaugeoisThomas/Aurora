//@vitest-environment jsdom

import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, test, vi, describe } from 'vitest'
import { useAsyncAction } from './useAsyncAction'

describe('useAsyncAction', () => {
  afterEach(cleanup)

  test("termine une action réussie sans afficher d'erreur", async () => {
    const action = vi.fn(async () => null)
    const { result } = renderHook(() => useAsyncAction())

    await act(async () => {
      await result.current.runAction(action, 'Erreur inattendue.')
    })

    expect(action).toHaveBeenCalledTimes(1)
    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.errorMessage).toBe('')
  })

  test('affiche une erreur renvoyée par l’action', async () => {
    const { result } = renderHook(() => useAsyncAction())

    await act(async () => {
      await result.current.runAction(
        async () => 'Action refusée.',
        'Erreur inattendue.',
      )
    })

    expect(result.current.errorMessage).toBe('Action refusée.')
    expect(result.current.isSubmitting).toBe(false)
  })

  test('affiche le message de secours si une exception est levée', async () => {
    const { result } = renderHook(() => useAsyncAction())

    await act(async () => {
      await result.current.runAction(async () => {
        throw new Error('Erreur technique simulée')
      }, 'Connexion interrompue.')
    })

    expect(result.current.errorMessage).toBe('Connexion interrompue.')
    expect(result.current.isSubmitting).toBe(false)
  })

  test('bloque une seconde action pendant une exécution', async () => {
    let finish: ((value: string | null) => void) | undefined

    const pendingAction = new Promise<string | null>((resolve) => {
      finish = resolve
    })

    const action = vi.fn(() => pendingAction)
    const { result } = renderHook(() => useAsyncAction())

    await act(async () => {
      void result.current.runAction(action, 'Erreur inattendue.')
    })

    expect(result.current.isSubmitting).toBe(true)

    await act(async () => {
      await result.current.runAction(action, 'Erreur inattendue.')
    })

    expect(action).toHaveBeenCalledTimes(1)

    await act(async () => {
      finish?.(null)
    })

    expect(result.current.isSubmitting).toBe(false)
    expect(result.current.errorMessage).toBe('')
  })

  test('efface une ancienne erreur lors d’une nouvelle action réussie', async () => {
    const { result } = renderHook(() => useAsyncAction())

    await act(async () => {
      await result.current.runAction(
        async () => 'Action refusée.',
        'Erreur inattendue.',
      )
    })

    expect(result.current.errorMessage).toBe('Action refusée.')

    await act(async () => {
      await result.current.runAction(async () => null, 'Erreur inattendue.')
    })

    expect(result.current.errorMessage).toBe('')
    expect(result.current.isSubmitting).toBe(false)
  })

  test('efface l’erreur sans exécuter une nouvelle action', async () => {
    const action = vi.fn(async () => 'Action refusée.')
    const { result } = renderHook(() => useAsyncAction())

    await act(async () => {
      await result.current.runAction(action, 'Erreur inattendue.')
    })

    act(() => {
      result.current.clearError()
    })

    expect(result.current.errorMessage).toBe('')
    expect(result.current.isSubmitting).toBe(false)
    expect(action).toHaveBeenCalledTimes(1)
  })

  test('ignore une demande après démontage', async () => {
    const action = vi.fn(async () => null)
    const { result, unmount } = renderHook(() => useAsyncAction())
    const runAction = result.current.runAction

    unmount()

    await runAction(action, 'Erreur inattendue.')

    expect(action).not.toHaveBeenCalled()
  })
})
