import type { Ref } from 'react'
import Button from '../ui/Button'

type EmptyStateProps = {
  title: string
  message: string
  actionButtonRef?: Ref<HTMLButtonElement>
  action?: {
    label: string
    onClick: () => void
  }
}

/**
 * Présente une zone sans données avec une action facultative.
 * @param props - Titre, message, action facultative et ref de son bouton pour le focus.
 * @returns Le message d’état vide et son bouton si une action existe.
 */
export default function EmptyState({
  title,
  message,
  action,
  actionButtonRef,
}: Readonly<EmptyStateProps>) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      {action && (
        <Button ref={actionButtonRef} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
