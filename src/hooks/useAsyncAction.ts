import { useEffect, useRef, useState } from 'react'

/**
 * Gère l'attente et les erreurs d'une action asynchrone.
 * @returns Les états et la fonction permettant d'executer une action.
 */
export function useAsyncAction() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const isRunning = useRef(false)
  const isActive = useRef(false)

  useEffect(() => {
    isActive.current = true
    return () => {
      isActive.current = false
    }
  }, [])

  /**
   * Execute une action unique et traite ses erreurs.
   * @param action - Fonction renvoyant un message d'erreur, ou null si réussie.
   * @param unexpectedErrorMessage - Message affiché si un exception est levée.
   * @returns Une promesse ; ignore les demandes concurrentes.
   */

  async function runAction(
    action: () => Promise<string | null>,
    unexpectedErrorMessage: string,
  ) {
    if (isRunning.current || !isActive.current) return

    isRunning.current = true
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const message = await action()

      if (isActive.current) {
        setErrorMessage(message ?? '')
      }
    } catch {
      if (isActive.current) {
        setErrorMessage(unexpectedErrorMessage)
      }
    } finally {
      isRunning.current = false

      if (isActive.current) {
        setIsSubmitting(false)
      }
    }
  }

  /**
   * Efface le message d'erreur sans lancer d'action.
   */
  function clearError() {
    setErrorMessage('')
  }
  return { isSubmitting, errorMessage, runAction, clearError }
}
