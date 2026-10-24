// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { supabase } from '../../lib/supabase'
import ResetPasswordForm from './ResetPasswordForm'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      updateUser: vi.fn(),
    },
  },
}))

describe('ResetPasswordForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(cleanup)

  test('bloque la modification lorsque les mots de passe diffèrent', async () => {
    render(<ResetPasswordForm />)

    fireEvent.change(
      screen.getByLabelText('Nouveau mot de passe', { selector: 'input' }),
      {
        target: { value: 'nouveau-password-123' },
      },
    )

    fireEvent.change(
      screen.getByLabelText('Confirmer le nouveau mot de passe'),
      {
        target: { value: 'autre-password-456' },
      },
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Enregistrer le mot de passe' }),
    )

    const message = await screen.findByText(
      'Les mots de passe ne correspondent pas.',
    )

    expect(message).toBeDefined()
    expect(supabase.auth.updateUser).not.toHaveBeenCalled()
    expect(screen.queryByText('Votre mot de passe a été modifié.')).toBeNull()
  })

  test('confirme la modification et vide les champs après un succès', async () => {
    vi.mocked(supabase.auth.updateUser).mockResolvedValue({
      data: {
        user: {
          id: 'user-test',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: '2026-01-01T00:00:00Z',
        },
      },
      error: null,
    })

    render(<ResetPasswordForm />)

    const passwordInput = screen.getByLabelText<HTMLInputElement>(
      'Nouveau mot de passe',
      { selector: 'input' },
    )
    const confirmationInput = screen.getByLabelText<HTMLInputElement>(
      'Confirmer le nouveau mot de passe',
    )

    fireEvent.change(passwordInput, {
      target: { value: 'nouveau-password-123' },
    })
    fireEvent.change(confirmationInput, {
      target: { value: 'nouveau-password-123' },
    })

    fireEvent.click(
      screen.getByRole('button', { name: 'Enregistrer le mot de passe' }),
    )

    await screen.findByText('Votre mot de passe a été modifié.')

    expect(supabase.auth.updateUser).toHaveBeenCalledWith({
      password: 'nouveau-password-123',
    })
    expect(passwordInput.value).toBe('')
    expect(confirmationInput.value).toBe('')
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
