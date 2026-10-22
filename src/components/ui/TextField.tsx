import { useId } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

type TextFieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'aria-invalid' | 'aria-describedby'
> & {
  label: string
  hint?: string
  error?: string
}

/**
 * Affiche un champ de saisie avec un label et des messages associés.
 * @param props - Label, aide et erreur facultatives, identifiant et propriétés natives.
 * @returns Un champ accessible relié à ses descriptions.
 */
export default function TextField({
  label,
  hint,
  error,
  id,
  ...props
}: Readonly<TextFieldProps>) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="form-field">
      <label htmlFor={inputId}>{label}</label>

      {hint && <p id={hintId}>{hint}</p>}

      <input
        {...props}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />

      {error && <p id={errorId}>{error}</p>}
    </div>
  )
}
