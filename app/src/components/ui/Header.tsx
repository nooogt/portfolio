import type { HTMLAttributes, ReactNode } from 'react'
import './Header.css'

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

interface HeaderSlotProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function HeaderSlot({
  children,
  className,
  slotClassName,
  ...props
}: HeaderSlotProps & { slotClassName: string }) {
  const classes = [slotClassName, className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export function Header({ children, className, ...props }: HeaderProps) {
  const classes = ['header', className].filter(Boolean).join(' ')

  return (
    <header className={classes} {...props}>
      {children}
    </header>
  )
}

export function HeaderStart(props: HeaderSlotProps) {
  return <HeaderSlot slotClassName="header__start" {...props} />
}

export function HeaderContent(props: HeaderSlotProps) {
  return <HeaderSlot slotClassName="header__content" {...props} />
}

export function HeaderEnd(props: HeaderSlotProps) {
  return <HeaderSlot slotClassName="header__end" {...props} />
}
