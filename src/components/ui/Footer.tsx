import type { HTMLAttributes, ReactNode } from 'react'
import './Footer.css'

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export interface FooterContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Footer({ children, className, ...props }: FooterProps) {
  const classes = ['footer', className].filter(Boolean).join(' ')

  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  )
}

export function FooterContent({
  children,
  className,
  ...props
}: FooterContentProps) {
  const classes = ['footer__content', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
