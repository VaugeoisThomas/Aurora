import Button from './Button'

type EmptyStateProps = {
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({
  title,
  message,
  action,
}: Readonly<EmptyStateProps>) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{message}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}
