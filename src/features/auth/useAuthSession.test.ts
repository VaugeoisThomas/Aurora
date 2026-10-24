// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { supabase } from '../../lib/supabase'
import { AuthError } from '@supabase/supabase-js'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { useAuthSession } from './useAuthSession'

const fakeSession: Session = {
  access_token: 'fake-access-token',
  refresh_token: 'fake-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: {
    id: 'fake-user-id',
    aud: 'authenticated',
    app_metadata: {},
    user_metadata: {},
    created_at: '2026-01-01T00:00:00Z',
  },
}

/**
 * Monte le hook et attend la fin du chargement initial.
 * @returns Le résultat du rendu et ses fonctions de contrôle.
 */
async function renderLoadAuthSession() {
  const hook = renderHook(() => useAuthSession())

  await waitFor(() => {
    expect(hook.result.current.isLoading).toBe(false)
  })
  return hook
}

/**
 * Simule un évènement Supabase et attend la mise à jour React.
 * @param e - Évènement de connexion ou de déconnexion.
 * @param session - Session associée, ou null après déconnexion.
 */
async function emitAuthEvent(e: AuthChangeEvent, session: Session | null) {
  const callback = vi.mocked(supabase.auth.onAuthStateChange).mock.calls[0][0]

  await act(async () => {
    await callback(e, session)
  })
}

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      })),
    },
  },
}))

describe('useAuthSession', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    })
  })

  afterEach(cleanup)

  test("termine le chargement sans erreur lorsqu'aucune session existe", async () => {
    const { result } = await renderLoadAuthSession()
    expect(result.current.session).toBeNull()
    expect(result.current.errorMessage).toBe('')
    expect(supabase.auth.getSession).toHaveBeenCalledTimes(1)
  })

  test('termine le chargement et affiche une erreur si la récupération échoue', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: new AuthError('Erreur simulée'),
    })
    const { result } = await renderLoadAuthSession()
    expect(result.current.session).toBeNull()
    expect(result.current.errorMessage).toBe(
      'Impossible de récupérer votre session.',
    )
  })

  test('termine le chargement si la récupération lève une exception', async () => {
    vi.mocked(supabase.auth.getSession).mockRejectedValue(
      new Error('Interruption simulée'),
    )

    const { result } = await renderLoadAuthSession()
    expect(result.current.session).toBeNull()
    expect(result.current.errorMessage).toBe(
      'La récupération de session a été interrompue.',
    )
  })

  test('restaure une session existante', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: fakeSession },
      error: null,
    })

    const { result } = await renderLoadAuthSession()
    expect(result.current.session).toEqual(fakeSession)
    expect(result.current.errorMessage).toBe('')
  })

  test('actualise la session après un évènement de connexion', async () => {
    const { result } = await renderLoadAuthSession()
    expect(result.current.session).toBeNull()

    await emitAuthEvent('SIGNED_IN', fakeSession)
    expect(result.current.session).toEqual(fakeSession)
    expect(result.current.errorMessage).toBe('')
  })

  test('retire la session après un évènement de déconnexion', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: fakeSession },
      error: null,
    })

    const { result } = await renderLoadAuthSession()
    expect(result.current.session).toEqual(fakeSession)

    await emitAuthEvent('SIGNED_OUT', null)
    expect(result.current.session).toBeNull()
    expect(result.current.errorMessage).toBe('')
    expect(result.current.isLoading).toBe(false)
  })

  test('conserve la nouvelle session malgré une réponse initiale tardive', async () => {
    type SessionResponse = Awaited<ReturnType<typeof supabase.auth.getSession>>
    let finish: ((response: SessionResponse) => void) | undefined

    const pendingResponse = new Promise<SessionResponse>((resolve) => {
      finish = resolve
    })

    vi.mocked(supabase.auth.getSession).mockReturnValue(pendingResponse)

    const { result } = await renderHook(() => useAuthSession())
    expect(result.current.isLoading).toBe(true)

    await emitAuthEvent('SIGNED_IN', fakeSession)

    expect(result.current.session).toEqual(fakeSession)
    expect(result.current.isLoading).toBe(false)

    await act(async () => {
      finish?.({
        data: { session: null },
        error: null,
      })
      await pendingResponse
    })

    expect(result.current.session).toEqual(fakeSession)
    expect(result.current.errorMessage).toBe('')
    expect(result.current.isLoading).toBe(false)
  })

  test("arrête l'abonnement lorsque le hook est démonté", async () => {
    const { unmount } = await renderLoadAuthSession()

    const subscription = vi.mocked(supabase.auth.onAuthStateChange).mock
      .results[0].value.data.subscription

    expect(subscription.unsubscribe).not.toHaveBeenCalled()
    unmount()

    expect(subscription.unsubscribe).toHaveBeenCalledTimes(1)
  })

  test('active le mode récupération après PASSWORD_RECOVERY', async () => {
    const { result } = await renderLoadAuthSession()

    expect(result.current.isPasswordRecovery).toBe(false)

    await emitAuthEvent('PASSWORD_RECOVERY', fakeSession)

    expect(result.current.isPasswordRecovery).toBe(true)
    expect(result.current.session).toEqual(fakeSession)
    expect(result.current.isLoading).toBe(false)
    expect(result.current.errorMessage).toBe('')
  })

  test('désactive le mode récupération après une déconnexion', async () => {
    const { result } = await renderLoadAuthSession()

    await emitAuthEvent('PASSWORD_RECOVERY', fakeSession)
    expect(result.current.isPasswordRecovery).toBe(true)

    await emitAuthEvent('SIGNED_OUT', null)

    expect(result.current.isPasswordRecovery).toBe(false)
    expect(result.current.session).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })
})
