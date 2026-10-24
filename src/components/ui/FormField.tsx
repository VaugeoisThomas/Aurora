import { useId } from 'react'
import type { ReactNode } from 'react'

type FieldControlProps = {
  id: string
  'aria-invalid': true | undefined
  'aria-describedby': string | undefined
}

type FormFieldProps = {
  id?: string
  label: string
  hint?: string
  error?: string
  children: (controlProps: FieldControlProps) => ReactNode
}

/**
 * Centralise le label et les descriptions accessibles d'un champ.
 * @param props - Textes, identifiant facultatif et fonction affichant le contrôle.
 * @returns L'enveloppe du champ avec ses associations accessibles.
 */
export default function FormField({
  id,
  label,
  hint,
  error,
  children,
}: Readonly<FormFieldProps>) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const hintId = `${controlId}-hint`
  const errorId = `${controlId}-error`
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="form-field">
      <label htmlFor={controlId}>{label}</label>
      {hint && <p id={hintId}>{hint}</p>}
      {children({
        id: controlId,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })}

      {error && <p id={errorId}>{error}</p>}
    </div>
  )
}
