import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'outline' | 'ghost'
export type ButtonSize = 36 | 46 | 56

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 56,
  startIcon,
  endIcon,
  className,
  children,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  const classes = [
    'button',
    `button--${variant}`,
    `button--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} type={type} {...buttonProps}>
      {startIcon ? <span className="button__icon">{startIcon}</span> : null}
      <span className="button__content">{children}</span>
      {endIcon ? <span className="button__icon">{endIcon}</span> : null}
    </button>
  )
}
