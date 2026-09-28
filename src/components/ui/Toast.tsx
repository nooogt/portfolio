import type { HTMLAttributes, ReactNode } from 'react'
import './Toast.css'

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  end?: ReactNode
  start?: ReactNode
}

export function Toast({
  children,
  className,
  end,
  role = 'status',
  start,
  ...props
}: ToastProps) {
  const classes = ['toast', className].filter(Boolean).join(' ')

  return (
    <div
      aria-atomic="true"
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
      className={classes}
      data-component="Toast"
      role={role}
      {...props}
    >
      {start ? <span className="toast__slot">{start}</span> : null}
      <span className="toast__message">{children}</span>
      {end ? <span className="toast__slot">{end}</span> : null}
    </div>
  )
}
