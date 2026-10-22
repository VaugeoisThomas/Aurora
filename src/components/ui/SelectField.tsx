import { useId } from 'react'
import type { ComponentPropsWithoutRef } from 'react'

type SelectFieldProps = Omit<
  ComponentPropsWithoutRef<'select'>,
  'aria-invalid' | 'aria-describedby'
> & {
  label: string
  hint?: string
  error?: string
}

/**
 * Affiche une sélection avec un label et des messages associés.
 * @param props - Label, options enfants, aide et erreur facultatives et propriétés natives.
 * @returns Un select accessible relié à ses descriptions.
 */
export default function SelectField({
  label,
  hint,
  error,
  id,
  children,
  ...props
}: Readonly<SelectFieldProps>) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const hintId = `${selectId}-hint`
  const errorId = `${selectId}-error`
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="form-field">
      <label htmlFor={selectId}>{label}</label>

      {hint && <p id={hintId}>{hint}</p>}

      <select
        {...props}
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      >
        {children}
      </select>

      {error && <p id={errorId}>{error}</p>}
    </div>
  )
}
