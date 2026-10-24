// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { supabase } from '../../lib/supabase'
import ForgotPasswordForm from './ForgotPasswordForm'
import { AuthError } from '@supabase/supabase-js'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: vi.fn(),
    },
  },
}))

describe('ForgotPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(cleanup)

  test('invite à consulter ses emails lorsque la demande est acceptée', async () => {
    vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValue({
      data: {},
      error: null,
    })

    render(<ForgotPasswordForm />)

    fireEvent.change(screen.getByLabelText('Adresse email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Recevoir un lien' }))

    const message = await screen.findByText(
      /Si un compte correspond à cette adresse/,
    )

    expect(message.textContent).toContain('vous recevrez un lien')
    expect(screen.queryByRole('alert')).toBeNull()
    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      'test@example.com',
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    )
  })

  test('affiche une erreur sans succès lorsque la demande est refusée', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    try {
      vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValue({
        data: null,
        error: new AuthError('Limite d’envoi atteinte', 429),
      })

      render(<ForgotPasswordForm />)

      fireEvent.change(screen.getByLabelText('Adresse email'), {
        target: { value: 'test@example.com' },
      })

      fireEvent.click(screen.getByRole('button', { name: 'Recevoir un lien' }))

      const alert = await screen.findByRole('alert')

      expect(alert.textContent).toContain(
        'Demande impossible pour le moment. Réessayez plus tard.',
      )
      expect(
        screen.queryByText(/Si un compte correspond à cette adresse/),
      ).toBeNull()
    } finally {
      consoleSpy.mockRestore()
    }
  })
})
