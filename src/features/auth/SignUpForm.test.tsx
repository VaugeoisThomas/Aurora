// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { supabase } from '../../lib/supabase'
import SignUpForm from './SignUpForm'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
  },
}))

describe('SignUpForm', () => {
  afterEach(cleanup)

  test('invite à confirmer l’email lorsque l’inscription ne fournit pas de session', async () => {
    vi.mocked(supabase.auth.signUp).mockResolvedValue({
      data: {
        user: {
          id: 'fake-user-id',
          aud: 'authenticated',
          app_metadata: {},
          user_metadata: {},
          created_at: '2026-01-01T00:00:00Z',
        },
        session: null,
      },
      error: null,
    })

    render(<SignUpForm />)

    fireEvent.change(screen.getByLabelText('Adresse email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'test-password-123' },
    })

    fireEvent.change(screen.getByLabelText('Confirmer le mot de passe'), {
      target: { value: 'test-password-123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Créer un compte' }))

    const confirmation = await screen.findByRole('status')

    expect(confirmation.textContent).toContain('consultez votre boîte email')
    expect(screen.queryByRole('alert')).toBeNull()

    expect(screen.getByLabelText('Mot de passe')).toHaveProperty('value', '')
    expect(screen.getByLabelText('Confirmer le mot de passe')).toHaveProperty(
      'value',
      '',
    )

    expect(supabase.auth.signUp).toHaveBeenCalledTimes(1)
  })
})
