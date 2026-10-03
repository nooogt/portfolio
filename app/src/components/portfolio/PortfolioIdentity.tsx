import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import './PortfolioIdentity.css'

const descriptors = ['Diseño de sistemas', 'UX/UI + Producto', 'Prototipado con IA']
const rotationInterval = 2000
const holdThreshold = 350

interface PortfolioIdentityProps {
  nameAs: 'h1' | 'span'
}

export function PortfolioIdentity({ nameAs: Name }: PortfolioIdentityProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const timerRef = useRef<number | null>(null)
  const heldRef = useRef(false)
  const pressStartedRef = useRef(0)
  const suppressClickRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = null
  }, [])

  const scheduleNext = useCallback(() => {
    clearTimer()
    if (reducedMotion || heldRef.current) return

    const tick = () => {
      setActiveIndex((index) => (index + 1) % descriptors.length)
      timerRef.current = window.setTimeout(tick, rotationInterval)
    }

    timerRef.current = window.setTimeout(tick, rotationInterval)
  }, [clearTimer, reducedMotion])

  useEffect(() => {
    scheduleNext()
    return clearTimer
  }, [clearTimer, scheduleNext])

  const releasePress = (cancelled = false) => {
    if (!heldRef.current) return
    heldRef.current = false
    suppressClickRef.current = cancelled || Date.now() - pressStartedRef.current >= holdThreshold
    scheduleNext()
  }

  const advance = (isPointerClick: boolean) => {
    if (isPointerClick && suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }
    suppressClickRef.current = false
    setActiveIndex((index) => (index + 1) % descriptors.length)
    scheduleNext()
  }

  return (
    <div className="portfolio-identity">
      <img alt="Retrato de Graciela" className="portfolio-identity__avatar" src="/home-assets/graciela-avatar.png" />
      <div className="portfolio-identity__copy">
        <Name className="portfolio-identity__name">Graciela</Name>
        <div className="portfolio-identity__skill-row">
          <button
            aria-label={`Cambiar descriptor: ${descriptors[activeIndex]}`}
            className="portfolio-identity__descriptor-viewport"
            onClick={(event) => advance(event.detail > 0)}
            onPointerCancel={() => releasePress(true)}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId)
              heldRef.current = true
              pressStartedRef.current = Date.now()
              suppressClickRef.current = false
              clearTimer()
            }}
            onPointerUp={(event) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom
              releasePress(outside)
            }}
            type="button"
          >
            <span className="portfolio-identity__accessible-descriptor">{descriptors[activeIndex]}</span>
            {reducedMotion ? (
              <span aria-hidden="true" className="portfolio-identity__descriptor">{descriptors[activeIndex]}</span>
            ) : (
              <AnimatePresence initial={false}>
                <motion.span
                  animate={{ y: 0 }}
                  aria-hidden="true"
                  className="portfolio-identity__descriptor"
                  exit={{ y: '-100%' }}
                  initial={{ y: '100%' }}
                  key={activeIndex}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  {descriptors[activeIndex]}
                </motion.span>
              </AnimatePresence>
            )}
          </button>
          <span aria-hidden="true" className="portfolio-identity__dots">
            {descriptors.map((descriptor, index) => (
              <i className={index === activeIndex ? 'portfolio-identity__dot--active' : undefined} key={descriptor} />
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}
