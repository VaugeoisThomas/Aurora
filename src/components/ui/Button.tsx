import type { ComponentPropsWithRef } from 'react'

type ButtonProps = ComponentPropsWithRef<'button'>

/**
 * Affiche un bouton partagé, de type button par défaut.
 * @param props - Contenu, classes supplémentaires et propriétés HTML natives.
 * @returns Un bouton avec les styles communs de l’application.
 */
export default function Button({
  children,
  type = 'button',
  className,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      className={['button', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}
