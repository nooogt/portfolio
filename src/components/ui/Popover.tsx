import type { HTMLAttributes } from 'react'
import './Popover.css'

export function Popover({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const classes = ['popover', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      <div className="popover__content">{children}</div>
    </div>
  )
}
