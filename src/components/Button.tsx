import type { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'>

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
