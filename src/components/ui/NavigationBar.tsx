import type { HTMLAttributes, ReactNode } from 'react'
import './NavigationBar.css'

/** Pencil source mapping: NavigationBar <- R2KtaP / TabBar. */
export interface NavigationBarProps extends HTMLAttributes<HTMLElement> {
  'aria-label': string
  children: ReactNode
}

export function NavigationBar({
  children,
  className,
  ...props
}: NavigationBarProps) {
  const classes = ['navigation-bar', className].filter(Boolean).join(' ')

  return (
    <nav className={classes} {...props}>
      <div className="navigation-bar__list">{children}</div>
    </nav>
  )
}
