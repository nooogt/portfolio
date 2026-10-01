import { Children, isValidElement, useEffect, useRef } from 'react'
import type { HTMLAttributes, KeyboardEvent as ReactKeyboardEvent, ReactNode, RefObject } from 'react'
import { createPortal } from 'react-dom'
import './PortfolioDetailSheet.css'

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface PortfolioDetailSheetProps {
  open: boolean
  onClose: () => void
  returnFocusRef: RefObject<HTMLElement | null>
  backgroundRef: RefObject<HTMLElement | null>
  labelledBy: string
  children: ReactNode
}

export function PortfolioDetailSheet({ open, onClose, returnFocusRef, backgroundRef, labelledBy, children }: PortfolioDetailSheetProps) {
  const panelRef = useRef<HTMLElement>(null)
  const onCloseRef = useRef(onClose)
  const regions = Children.toArray(children)
  const footer = regions.filter((child) => isValidElement(child) && child.type === PortfolioDetailSheetFooter)
  const surface = regions.filter((child) => !footer.includes(child))

  useEffect(() => { onCloseRef.current = onClose }, [onClose])

  useEffect(() => {
    if (!open) return
    const returnFocus = returnFocusRef.current
    const background = backgroundRef.current
    const previousInert = background?.inert
    const previousOverflow = document.body.style.overflow
    if (background) background.inert = true
    document.body.style.overflow = 'hidden'
    const focusable = panelRef.current?.querySelector<HTMLElement>(focusableSelector)
    ;(focusable ?? panelRef.current)?.focus()
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = previousOverflow
      if (background) background.inert = previousInert ?? false
      returnFocus?.focus()
    }
  }, [open, returnFocusRef, backgroundRef])

  if (!open) return null

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Tab') return
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter((element) => element.getClientRects().length > 0)
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (!first || !last) {
      event.preventDefault()
      panelRef.current?.focus()
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return createPortal(
    <div className="portfolio-detail-sheet__overlay">
      <section aria-labelledby={labelledBy} aria-modal="true" className="portfolio-detail-sheet" onKeyDown={handleKeyDown} ref={panelRef} role="dialog" tabIndex={-1}>
        <div className="portfolio-detail-sheet__surface">{surface}</div>
        {footer}
      </section>
    </div>,
    document.body,
  )
}

export function PortfolioDetailSheetHeader({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <header {...props} className={['portfolio-detail-sheet__header', className].filter(Boolean).join(' ')} />
}

export function PortfolioDetailSheetBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={['portfolio-detail-sheet__body', className].filter(Boolean).join(' ')} />
}

export function PortfolioDetailSheetFooter({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <footer {...props} className={['portfolio-detail-sheet__footer', className].filter(Boolean).join(' ')} />
}
