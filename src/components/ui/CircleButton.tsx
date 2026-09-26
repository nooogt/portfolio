import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './CircleButton.css'

export type CircleButtonVariant = 'secondary' | 'outline' | 'ghost'
export type CircleButtonSize = 36 | 40 | 46 | 48 | 56

export interface CircleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: CircleButtonVariant
  size?: CircleButtonSize
  'aria-label': string
  children: ReactNode
}

export function CircleButton({
  variant,
  size = 56,
  className,
  children,
  type = 'button',
  ...buttonProps
}: CircleButtonProps) {
  const classes = [
    'circle-button',
    `circle-button--${variant}`,
    `circle-button--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} type={type} {...buttonProps}>
      <span className="circle-button__icon">{children}</span>
    </button>
  )
}
