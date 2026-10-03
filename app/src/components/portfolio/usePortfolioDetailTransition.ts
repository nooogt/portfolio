import { useEffect, useLayoutEffect, useRef } from 'react'
import { animate } from 'motion'
import { useReducedMotion } from 'motion/react'

type AnimationControl = { stop: () => void }

export function usePortfolioDetailTransition(detailKey: string | null, onClosed: () => void) {
  const surfaceRef = useRef<HTMLDivElement | null>(null)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)
  const triggersRef = useRef(new Map<string, HTMLButtonElement>())
  const sourceRectRef = useRef<DOMRect | null>(null)
  const closingRef = useRef(false)
  const animationsRef = useRef<AnimationControl[]>([])
  const onClosedRef = useRef(onClosed)
  const reduceMotion = useReducedMotion()

  useEffect(() => { onClosedRef.current = onClosed }, [onClosed])
  useEffect(() => () => {
    closingRef.current = false
    animationsRef.current.forEach((animation) => animation.stop())
  }, [])

  useLayoutEffect(() => {
    if (!detailKey || reduceMotion) return
    const surface = surfaceRef.current
    const source = sourceRectRef.current
    if (!surface || !source) return

    const destination = surface.getBoundingClientRect()
    if (!destination.width || !destination.height) return
    const overlay = surface.closest<HTMLElement>('.portfolio-detail-sheet__overlay')
    const header = surface.querySelector<HTMLElement>('.portfolio-detail-sheet__header')
    const body = surface.querySelector<HTMLElement>('.portfolio-detail-sheet__body')
    const footer = overlay?.querySelector<HTMLElement>('.portfolio-detail-sheet__footer')
    const offsetX = source.left - destination.left
    const offsetY = source.top - destination.top
    const scaleX = source.width / destination.width
    const scaleY = source.height / destination.height
    surface.style.transformOrigin = 'top left'
    surface.style.willChange = 'transform'

    for (const region of [header, body, footer]) {
      if (region) region.style.opacity = '0'
    }
    const surfaceAnimation = animate(surface, {
      x: [offsetX, 0], y: [offsetY, 0], scaleX: [scaleX, 1], scaleY: [scaleY, 1],
    }, { duration: 0.44, ease: [0.22, 1, 0.36, 1] })
    animationsRef.current = [surfaceAnimation]
    if (overlay) {
      const scrim = getComputedStyle(overlay).backgroundColor
      animationsRef.current.push(animate(overlay, { backgroundColor: ['rgba(0, 0, 0, 0)', scrim] }, { duration: 0.26 }))
    }
    for (const [region, delay, distance] of [[header, 0.14, 10], [body, 0.18, 8], [footer, 0.25, 12]] as const) {
      if (region) animationsRef.current.push(animate(region, { opacity: [0, 1], y: [distance, 0] }, { duration: 0.25, delay, ease: 'easeOut' }))
    }
  }, [detailKey, reduceMotion])

  const registerTrigger = (key: string, trigger: HTMLButtonElement) => {
    triggersRef.current.set(key, trigger)
    returnFocusRef.current = trigger
  }

  const prepareOpen = (key: string) => {
    const trigger = triggersRef.current.get(key)
    returnFocusRef.current = trigger ?? null
    sourceRectRef.current = trigger?.getBoundingClientRect() ?? null
    closingRef.current = false
  }

  const clearPending = () => {
    sourceRectRef.current = null
    closingRef.current = false
  }

  const close = () => {
    if (closingRef.current) return
    if (reduceMotion) {
      onClosedRef.current()
      return
    }
    const surface = surfaceRef.current
    const source = detailKey ? triggersRef.current.get(detailKey)?.getBoundingClientRect() : null
    if (!surface || !source) {
      onClosedRef.current()
      return
    }

    closingRef.current = true
    const current = surface.getBoundingClientRect()
    animationsRef.current.forEach((animation) => animation.stop())
    surface.style.transform = 'none'
    const destination = surface.getBoundingClientRect()
    if (!destination.width || !destination.height) {
      closingRef.current = false
      onClosedRef.current()
      return
    }
    const startX = current.left - destination.left
    const startY = current.top - destination.top
    const startScaleX = current.width / destination.width
    const startScaleY = current.height / destination.height
    const overlay = surface.closest<HTMLElement>('.portfolio-detail-sheet__overlay')
    const header = surface.querySelector<HTMLElement>('.portfolio-detail-sheet__header')
    const body = surface.querySelector<HTMLElement>('.portfolio-detail-sheet__body')
    const footer = overlay?.querySelector<HTMLElement>('.portfolio-detail-sheet__footer')
    const exitAnimations: AnimationControl[] = []
    for (const region of [header, body, footer]) {
      if (region) exitAnimations.push(animate(region, { opacity: 0, y: 8 }, { duration: 0.16 }))
    }
    if (overlay) exitAnimations.push(animate(overlay, { backgroundColor: 'rgba(0, 0, 0, 0)' }, { duration: 0.32 }))
    const surfaceAnimation = animate(surface, {
      x: [startX, source.left - destination.left],
      y: [startY, source.top - destination.top],
      scaleX: [startScaleX, source.width / destination.width],
      scaleY: [startScaleY, source.height / destination.height],
    }, { duration: 0.38, ease: [0.32, 0, 0.67, 1] })
    animationsRef.current = [...exitAnimations, surfaceAnimation]
    surfaceAnimation.then(() => {
      if (!closingRef.current) return
      closingRef.current = false
      sourceRectRef.current = null
      onClosedRef.current()
    })
  }

  return { surfaceRef, returnFocusRef, registerTrigger, prepareOpen, clearPending, close }
}
