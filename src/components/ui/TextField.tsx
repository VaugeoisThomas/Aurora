import type { ComponentPropsWithoutRef } from 'react'
import FormField from './FormField'

type TextFieldProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'aria-invalid' | 'aria-describedby'
> & {
  label: string
  hint?: string
  error?: string
}

/**
 * Affiche un input dans une enveloppe de champ accessible.
 * @param props - Label, descriptions et propriétés HTML natives.
 * @returns Le champ de saisie et ses messages associés.
 */
export default function TextField({
  label,
  hint,
  error,
  id,
  ...props
}: Readonly<TextFieldProps>) {
  return (
    <FormField id={id} label={label} hint={hint} error={error}>
      {(controlProps) => <input {...props} {...controlProps} />}
    </FormField>
  )
}
