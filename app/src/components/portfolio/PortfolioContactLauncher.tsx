import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { CircleButton } from '../ui/CircleButton'
import { Toast } from '../ui/Toast'
import './PortfolioContactLauncher.css'

// Pending canonical Portfolio destinations. Do not replace with invented addresses.
const CONTACT_EMAIL: string | null = null
const LINKEDIN_URL: string | null = null
const toastDuration = 3500
const focusableSelector = 'button:not([disabled]), a[href]:not([aria-disabled="true"])'

function PhoneIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.13.97.37 1.92.72 2.82a2 2 0 0 1-.45 2.11L9.09 10.9a16 16 0 0 0 4 4l1.27-1.26a2 2 0 0 1 2.1-.45c.91.35 1.86.59 2.83.72A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}

export function PortfolioContactLauncher() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const launcherRef = useRef<HTMLDivElement>(null)
  const gmailRef = useRef<HTMLButtonElement>(null)
  const previousPathRef = useRef(pathname)

  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname
      setOpen(false)
    }
  }, [pathname])

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  useEffect(() => {
    if (!open) return

    const page = launcherRef.current?.closest('.portfolio-layout')
    const trigger = launcherRef.current?.querySelector<HTMLButtonElement>('.circle-button')
    const background = [
      page?.querySelector('header'),
      page?.querySelector('main'),
      page?.querySelector('nav'),
    ].filter((node): node is HTMLElement => node instanceof HTMLElement)
    const previousInert = background.map((node) => node.inert)
    const main = page?.querySelector('main')
    const previousMainOverflow = main?.style.overflowY
    const previousBodyOverflow = document.body.style.overflow

    background.forEach((node) => { node.inert = true })
    if (main) main.style.overflowY = 'hidden'
    document.body.style.overflow = 'hidden'
    gmailRef.current?.focus()

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      background.forEach((node, index) => { node.inert = previousInert[index] })
      if (main) main.style.overflowY = previousMainOverflow ?? ''
      document.body.style.overflow = previousBodyOverflow
      trigger?.focus()
    }
  }, [open])

  const showToast = (message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToastMessage(message)
    timerRef.current = setTimeout(() => {
      setToastMessage(null)
      timerRef.current = null
    }, toastDuration)
  }

  const handleGmail = async () => {
    if (!CONTACT_EMAIL) {
      setOpen(false)
      showToast('No se pudo copiar')
      return
    }

    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setOpen(false)
      showToast('Correo copiado')
    } catch {
      setOpen(false)
      showToast('No se pudo copiar')
    }
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!open || event.key !== 'Tab') return
    const elements = Array.from(launcherRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])
    const first = elements[0]
    const last = elements[elements.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <div
        aria-label={open ? 'Opciones de contacto' : undefined}
        aria-modal={open ? 'true' : undefined}
        className={`portfolio-contact${open ? ' portfolio-contact--open' : ''}`}
        onKeyDown={handleKeyDown}
        ref={launcherRef}
        role={open ? 'dialog' : undefined}
      >
        {open ? (
          <div className="portfolio-contact__actions">
            <button className="portfolio-contact__action" onClick={handleGmail} ref={gmailRef} type="button">
              <span aria-hidden="true" className="portfolio-contact__mark">M</span>
              <span>GMAIL</span>
            </button>
            <a
              aria-disabled={LINKEDIN_URL ? undefined : 'true'}
              className="portfolio-contact__action"
              href={LINKEDIN_URL ?? undefined}
              onClick={LINKEDIN_URL ? () => setOpen(false) : undefined}
              rel="noopener noreferrer"
              tabIndex={LINKEDIN_URL ? undefined : -1}
              target="_blank"
            >
              <span aria-hidden="true" className="portfolio-contact__mark">in</span>
              <span>LINKEDIN</span>
            </a>
          </div>
        ) : null}
        <CircleButton
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Contacto"
          className={open ? 'portfolio-contact__trigger--active' : undefined}
          onClick={() => setOpen((current) => !current)}
          size={48}
          variant="secondary"
        >
          <PhoneIcon />
        </CircleButton>
      </div>
      {open ? <div aria-hidden="true" className="portfolio-contact__scrim" onClick={() => setOpen(false)} /> : null}
      {toastMessage ? createPortal(
        <div className="portfolio-contact__toast"><Toast>{toastMessage}</Toast></div>,
        document.body,
      ) : null}
    </>
  )
}
