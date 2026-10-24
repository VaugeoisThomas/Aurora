import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

/**
 * Récupère la session et suit les changements d'authentification.
 * @returns La session, le chargement l'erreur et le mode récupération.
 */

export function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(
    () => window.location.pathname === '/reset-password',
  )

  useEffect(() => {
    let isActive = true
    let hasAuthChanged = false

    async function loadSession() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (!isActive || hasAuthChanged) return

        if (error) {
          setErrorMessage('Impossible de récupérer votre session.')
          return
        }

        setSession(data.session)
      } catch {
        if (isActive && !hasAuthChanged) {
          setErrorMessage('La récupération de session a été interrompue.')
        }
      } finally {
        if (isActive && !hasAuthChanged) {
          setIsLoading(false)
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((e, nextSession) => {
      if (!isActive || e === 'INITIAL_SESSION') return
      if (e === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true)
      } else if (e === 'SIGNED_OUT') {
        setIsPasswordRecovery(false)
      }

      hasAuthChanged = true
      setSession(nextSession)
      setErrorMessage('')
      setIsLoading(false)
    })

    void loadSession()

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
  }, [])

  return { session, isLoading, errorMessage, isPasswordRecovery }
}
