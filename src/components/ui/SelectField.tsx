import type { ComponentPropsWithoutRef } from 'react'
import FormField from './FormField'

type SelectFieldProps = Omit<
  ComponentPropsWithoutRef<'select'>,
  'aria-invalid' | 'aria-describedby'
> & {
  label: string
  hint?: string
  error?: string
}

/**
 * Affiche un select dans une enveloppe de champ accessible.
 * @param props - Label, descriptions et propriétés HTML natives.
 * @returns Le champ de sélection et ses messages associés.
 */
export default function SelectField({
  label,
  hint,
  error,
  id,
  children,
  ...props
}: Readonly<SelectFieldProps>) {
  return (
    <FormField id={id} label={label} hint={hint} error={error}>
      {(controlProps) => (
        <select {...props} {...controlProps}>
          {children}
        </select>
      )}
    </FormField>
  )
}
