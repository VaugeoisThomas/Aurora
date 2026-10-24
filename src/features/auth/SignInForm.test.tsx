//@vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { AuthError } from '@supabase/supabase-js'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { supabase } from '../../lib/supabase'
import SignInForm from './SignInForm'

vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}))

describe('SignInForm', () => {
  afterEach(cleanup)

  test('affiche une erreur sans faux succès lorsque la connexion est refusée', async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: new AuthError('Identifants incorrects'),
    })

    render(<SignInForm />)

    fireEvent.change(screen.getByLabelText('Adresse email'), {
      target: { value: 'test@example.com' },
    })

    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'incorrect-password' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }))

    const alert = await screen.findByRole('alert')

    expect(alert.textContent).toContain('Connexion impossible.')
    expect(
      screen.queryByText('Connexion réussie : une session a été établie.'),
    ).toBeNull()
    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'incorrect-password',
    })
  })
})
