import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import type {
  HTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import './Dialog.css'

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

interface DialogContextValue {
  close: () => void
  descriptionId: string
  registerDescription: (present: boolean) => void
  registerTitle: (present: boolean) => void
  titleId: string
}

const DialogContext = createContext<DialogContextValue | null>(null)

function useDialogContext() {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('Dialog subcomponents must be rendered inside Dialog.')
  }

  return context
}

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  className?: string
  dismissOnOverlayClick?: boolean
  dismissOnEscape?: boolean
  initialFocusRef?: RefObject<HTMLElement | null>
  labelledBy?: string
  describedBy?: string
}

export function Dialog({
  open,
  onOpenChange,
  children,
  className,
  dismissOnOverlayClick = true,
  dismissOnEscape = true,
  initialFocusRef,
  labelledBy,
  describedBy,
}: DialogProps) {
  const generatedId = useId()
  const titleId = `${generatedId}-title`
  const descriptionId = `${generatedId}-description`
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const [hasDescription, setHasDescription] = useState(false)
  const [hasTitle, setHasTitle] = useState(false)
  const classes = ['dialog', className].filter(Boolean).join(' ')

  useEffect(() => {
    if (!open) return

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const dialog = dialogRef.current
    const firstFocusable = dialog?.querySelector<HTMLElement>(focusableSelector)
    const focusTarget = initialFocusRef?.current ?? firstFocusable ?? dialog
    focusTarget?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [initialFocusRef, open])

  useEffect(() => {
    if (!open || !dismissOnEscape) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onOpenChange(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [dismissOnEscape, onOpenChange, open])

  if (!open) return null

  const handleOverlayClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (dismissOnOverlayClick && event.target === event.currentTarget) {
      onOpenChange(false)
    }
  }

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((element) => element.offsetParent !== null)

    if (focusableElements.length === 0) {
      event.preventDefault()
      event.currentTarget.focus()
      return
    }

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return createPortal(
    <div className="dialog-overlay" onMouseDown={handleOverlayClick}>
      <DialogContext.Provider
        value={{
          close: () => onOpenChange(false),
          descriptionId,
          registerDescription: setHasDescription,
          registerTitle: setHasTitle,
          titleId,
        }}
      >
        <div
          aria-describedby={
            describedBy ?? (hasDescription ? descriptionId : undefined)
          }
          aria-labelledby={labelledBy ?? (hasTitle ? titleId : undefined)}
          aria-modal="true"
          className={classes}
          onKeyDown={handleDialogKeyDown}
          ref={dialogRef}
          role="dialog"
          tabIndex={-1}
        >
          {children}
        </div>
      </DialogContext.Provider>
    </div>,
    document.body,
  )
}

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const classes = ['dialog__header', className].filter(Boolean).join(' ')
  return <header className={classes} {...props} />
}

export function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const { registerTitle, titleId } = useDialogContext()
  const classes = ['dialog__title', className].filter(Boolean).join(' ')

  useEffect(() => {
    registerTitle(true)
    return () => registerTitle(false)
  }, [registerTitle])

  return <h2 {...props} className={classes} id={titleId} />
}

export function DialogClose({ children }: { children: ReactNode }) {
  const { close } = useDialogContext()
  return (
    <div className="dialog__end" onClick={close}>
      {children}
    </div>
  )
}

export function DialogBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const classes = ['dialog__body', className].filter(Boolean).join(' ')
  return <div className={classes} {...props} />
}

export function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId, registerDescription } = useDialogContext()
  const classes = ['dialog__description', className].filter(Boolean).join(' ')

  useEffect(() => {
    registerDescription(true)
    return () => registerDescription(false)
  }, [registerDescription])

  return <p {...props} className={classes} id={descriptionId} />
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const classes = ['dialog__footer', className].filter(Boolean).join(' ')
  return <footer className={classes} {...props} />
}
