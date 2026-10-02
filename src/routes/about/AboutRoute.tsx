import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CircleButton } from '../../components/ui/CircleButton'
import { Header, HeaderContent, HeaderEnd } from '../../components/ui/Header'
import { PortfolioDetailSheet, PortfolioDetailSheetBody, PortfolioDetailSheetFooter, PortfolioDetailSheetHeader } from '../../components/portfolio/PortfolioDetailSheet'
import { PortfolioIdentity } from '../../components/portfolio/PortfolioIdentity'
import { CollapseIcon, ExpandIcon } from '../../components/portfolio/PortfolioDetailIcons'
import { usePortfolioDetailTransition } from '../../components/portfolio/usePortfolioDetailTransition'
import { usePortfolioBackgroundRef } from '../../app/layouts/usePortfolioBackgroundRef'
import './AboutRoute.css'

type Section = 'section-01' | 'section-02' | 'section-03'

const sections: { id: Section; number: string }[] = [
  { id: 'section-01', number: 'SECTION 01' },
  { id: 'section-02', number: 'SECTION 02' },
  { id: 'section-03', number: 'SECTION 03' },
]
const cardEntranceSpring = { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.85 }
const cardInteractionSpring = { type: 'spring' as const, stiffness: 360, damping: 30, mass: 0.75 }

interface AboutSectionCardProps {
  section: (typeof sections)[number]
  index: number
  reducedMotion: boolean
  onOpen: (section: Section, trigger: HTMLButtonElement) => void
}

function AboutSectionCard({ section, index, reducedMotion, onOpen }: AboutSectionCardProps) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pressed, setPressed] = useState(false)
  const interactionScale = pressed ? 0.985 : hovered || focused ? 1.02 : 1

  return (
    <motion.div
      animate={{ scale: 1 }}
      className="about__selector-wrap"
      initial={reducedMotion ? false : { scale: 0.87 }}
      style={{ transformOrigin: 'center' }}
      transition={reducedMotion ? { duration: 0 } : { ...cardEntranceSpring, delay: index * 0.11 }}
    >
      <motion.button
        animate={{ scale: reducedMotion ? 1 : interactionScale }}
        className="about__selector"
        onBlur={() => setFocused(false)}
        onClick={(event) => onOpen(section.id, event.currentTarget)}
        onFocus={(event) => setFocused(event.currentTarget.matches(':focus-visible'))}
        onHoverEnd={() => setHovered(false)}
        onHoverStart={() => setHovered(true)}
        onPointerCancel={() => setPressed(false)}
        onPointerDown={() => setPressed(true)}
        onPointerLeave={() => setPressed(false)}
        onPointerUp={() => setPressed(false)}
        style={{ transformOrigin: 'center' }}
        transition={reducedMotion ? { duration: 0 } : cardInteractionSpring}
        type="button"
      >
        <span className="about__selector-number">{section.number}</span>
        <span className="about__selector-label">Section label</span>
        <span aria-hidden="true" className="about__selector-affordance"><ExpandIcon /></span>
      </motion.button>
    </motion.div>
  )
}

function SunIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42 1.42" />
    </svg>
  )
}

export function AboutRoute() {
  const reducedMotion = useReducedMotion() ?? false
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const backgroundRef = usePortfolioBackgroundRef()
  const detailTransition = usePortfolioDetailTransition(selectedSection, () => setSelectedSection(null))
  const titleId = useId()
  const selected = sections.find((section) => section.id === selectedSection)

  const onSectionOpen = (section: Section, trigger: HTMLButtonElement) => {
    detailTransition.registerTrigger(section, trigger)
    detailTransition.prepareOpen(section)
    setSelectedSection(section)
  }

  return (
    <div className="about">
      <div aria-hidden="true" className="about__world" />
      <div className="about__page">
        <Header className="about__header">
          <HeaderContent className="about__header-content">
            <PortfolioIdentity nameAs="span" />
          </HeaderContent>
          <HeaderEnd className="about__header-end">
            <CircleButton aria-disabled="true" aria-label="Cambiar tema (próximamente)" tabIndex={-1} variant="outline"><SunIcon /></CircleButton>
          </HeaderEnd>
        </Header>

        <main className="about__main">
          <h1>ABOUT</h1>
          <div className="about__sections">
            {sections.map((section, index) => <AboutSectionCard index={index} key={section.id} onOpen={onSectionOpen} reducedMotion={reducedMotion} section={section} />)}
          </div>
        </main>

      </div>
      <PortfolioDetailSheet backgroundRef={backgroundRef} labelledBy={titleId} onClose={detailTransition.close} open={selectedSection !== null} returnFocusRef={detailTransition.returnFocusRef} surfaceRef={detailTransition.surfaceRef}>
        <PortfolioDetailSheetHeader className="about-sheet__header">
          <h2 id={titleId}>{selected?.number ?? ''}</h2>
          <p>Section label</p>
        </PortfolioDetailSheetHeader>
        <PortfolioDetailSheetBody className="about-sheet__body">
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
        </PortfolioDetailSheetBody>
        <PortfolioDetailSheetFooter>
          <CircleButton aria-label="Cerrar detalle" onClick={detailTransition.close} size={36} variant="outline"><CollapseIcon /></CircleButton>
        </PortfolioDetailSheetFooter>
      </PortfolioDetailSheet>
    </div>
  )
}
