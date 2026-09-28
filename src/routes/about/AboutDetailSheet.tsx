import { useEffect, useId, useRef } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '../../components/ui/Button'
import './AboutDetailSheet.css'

const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'

interface AboutDetailSheetProps {
  open: boolean
  title: string
  onClose: () => void
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

export function AboutDetailSheet({ open, title, onClose, returnFocusRef }: AboutDetailSheetProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const returnFocus = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
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
      returnFocus?.focus()
    }
  }, [open, returnFocusRef])

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
    <div className="about-sheet__overlay">
      <section aria-labelledby={titleId} aria-modal="true" className="about-sheet" onKeyDown={handleKeyDown} ref={panelRef} role="dialog" tabIndex={-1}>
        <header className="about-sheet__header">
          <h2 id={titleId}>{title}</h2>
          <p>Section label</p>
        </header>
        <div className="about-sheet__body">
          <p>Detalle de ejemplo para visualizar la estructura.</p>
          <div aria-label="Media placeholder" className="about-sheet__media" role="img">MEDIA PLACEHOLDER</div>
          <div className="about-sheet__dialogue">
            <img alt="" src="/home-assets/qb.png" />
            <p>QB / dialogue block</p>
          </div>
          <section className="about-sheet__secondary">
            <h3>SECONDARY CONTENT</h3>
            <p>Contenido estructural de ejemplo.</p>
            <p>Contenido estructural de ejemplo.</p>
            <p>Contenido estructural de ejemplo.</p>
            <p>Contenido estructural de ejemplo.</p>
          </section>
        </div>
        <footer className="about-sheet__footer">
          <Button onClick={onClose} size={36} variant="outline">BACK / CLOSE</Button>
        </footer>
      </section>
    </div>,
    document.body,
  )
}
