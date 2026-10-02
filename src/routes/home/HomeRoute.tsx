import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { CircleButton } from '../../components/ui/CircleButton'
import { Button } from '../../components/ui/Button'
import { CodeInput } from '../../components/ui/CodeInput'
import { Dialog, DialogBody, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/Dialog'
import { Header, HeaderContent, HeaderEnd } from '../../components/ui/Header'
import { PortfolioDetailSheet, PortfolioDetailSheetBody, PortfolioDetailSheetFooter, PortfolioDetailSheetHeader } from '../../components/portfolio/PortfolioDetailSheet'
import { PortfolioIdentity } from '../../components/portfolio/PortfolioIdentity'
import { CollapseIcon, ExpandIcon } from '../../components/portfolio/PortfolioDetailIcons'
import { usePortfolioDetailTransition } from '../../components/portfolio/usePortfolioDetailTransition'
import { usePortfolioBackgroundRef } from '../../app/layouts/usePortfolioBackgroundRef'
import './HomeRoute.css'

const assetPath = '/home-assets/'
// TEMPORARY: Replace with the numeric code distributed in the CV before publishing.
const temporaryAccessCode = '482731'
const cardEntranceSpring = { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.85 }
const cardInteractionSpring = { type: 'spring' as const, stiffness: 360, damping: 30, mass: 0.75 }

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  )
}

interface HomeProject {
  title: string
  slug: string
  media: string
  alt: string
  metadata: string
  requiresAccess?: boolean
  featured?: boolean
  tall?: boolean
}

const projects: HomeProject[] = [
  { slug: 'prototype-factory', title: 'PROTOTYPE FACTORY', media: 'prototype-factory-media.png', alt: 'Vista de carpetas y documentos de Prototype Factory', metadata: 'AI · Design Systems · Prototyping', featured: true },
  { slug: 'rampet', title: 'RAMPET', media: 'rampet-media.png', alt: 'Captura de la interfaz móvil de Rampet', metadata: 'Product Design · Mobile · Systems', tall: true },
  { slug: 'hope', title: 'HOPE', media: 'hope-media.png', alt: 'Arte de la aplicación Hope', metadata: 'Product Design · Mobile · Systems' },
  { slug: 'conexcom', title: 'CONEXCOM', media: 'conexcom-media.png', alt: 'Captura de un formulario de Conexcom', metadata: 'Product Design · Mobile · Systems', requiresAccess: true },
]

interface HomeProjectCardProps {
  project: HomeProject
  index: number
  reducedMotion: boolean
  onOpen: (project: HomeProject, trigger: HTMLButtonElement) => void
}

function HomeProjectCard({ project, index, reducedMotion, onOpen }: HomeProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pressed, setPressed] = useState(false)
  const { title, media, alt, metadata, featured = false, tall = false } = project
  const interactionScale = pressed ? 0.985 : hovered || focused ? 1.02 : 1
  const linkClasses = [
    'home__card-link',
    featured && 'home__card-link--featured',
    tall && 'home__card-link--tall',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.div
      animate={{ scale: 1 }}
      className={linkClasses}
      initial={reducedMotion ? false : { scale: 0.87 }}
      style={{ transformOrigin: 'center' }}
      transition={reducedMotion ? { duration: 0 } : { ...cardEntranceSpring, delay: index * 0.11 }}
    >
      <motion.div
        animate={{ scale: reducedMotion ? 1 : interactionScale }}
        className="home__card-interaction"
        onHoverEnd={() => setHovered(false)}
        onHoverStart={() => setHovered(true)}
        transition={reducedMotion ? { duration: 0 } : cardInteractionSpring}
      >
        <Card className="home__card">
          <CardHeader className="home__card-header">
            {featured ? (
              <h2 className="home__card-title">{title}</h2>
            ) : (
              <h3 className="home__card-title">{title}</h3>
            )}
            <p className="home__card-meta">{metadata}</p>
          </CardHeader>
          <CardBody className="home__card-body">
            <img
              alt={alt}
              className="home__card-media"
              src={`${assetPath}${media}`}
            />
          </CardBody>
        </Card>
        <button
          aria-label={`Abrir detalle de ${title}`}
          className="home__card-trigger"
          onBlur={() => setFocused(false)}
          onClick={(event) => onOpen(project, event.currentTarget)}
          onFocus={(event) => setFocused(event.currentTarget.matches(':focus-visible'))}
          onPointerCancel={() => setPressed(false)}
          onPointerDown={() => setPressed(true)}
          onPointerLeave={() => setPressed(false)}
          onPointerUp={() => setPressed(false)}
          type="button"
        />
        <span aria-hidden="true" className="home__card-affordance"><ExpandIcon /></span>
      </motion.div>
    </motion.div>
  )
}

export function HomeRoute() {
  const reducedMotion = useReducedMotion() ?? false
  const [selectedProject, setSelectedProject] = useState<HomeProject | null>(null)
  const [pendingProject, setPendingProject] = useState<HomeProject | null>(null)
  const [accessCode, setAccessCode] = useState('')
  const [accessError, setAccessError] = useState(false)
  const backgroundRef = usePortfolioBackgroundRef()
  const detailTransition = usePortfolioDetailTransition(selectedProject?.slug ?? null, () => setSelectedProject(null))
  const titleId = useId()

  const onProjectOpen = (project: HomeProject, trigger: HTMLButtonElement) => {
    detailTransition.registerTrigger(project.slug, trigger)
    if (project.requiresAccess) {
      setAccessCode('')
      setAccessError(false)
      setPendingProject(project)
    } else {
      detailTransition.prepareOpen(project.slug)
      setSelectedProject(project)
    }
  }

  const closeAccessDialog = () => {
    setPendingProject(null)
    setAccessCode('')
    setAccessError(false)
    detailTransition.clearPending()
  }

  const submitAccessCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!pendingProject) return
    if (accessCode !== temporaryAccessCode) {
      setAccessError(true)
      return
    }

    const project = pendingProject
    closeAccessDialog()
    // Let Dialog release its focus trap and scroll lock before opening the sheet.
    window.setTimeout(() => {
      detailTransition.prepareOpen(project.slug)
      setSelectedProject(project)
    }, 0)
  }

  return (
    <div className="home">
      <div aria-hidden="true" className="home__world" />
      <div className="home__page">
      <Header className="home__header">
        <HeaderContent className="home__header-content">
          <PortfolioIdentity nameAs="h1" />
        </HeaderContent>
        <HeaderEnd className="home__header-end">
          <CircleButton
            aria-disabled="true"
            aria-label="Cambiar tema (próximamente)"
            tabIndex={-1}
            variant="outline"
          >
            <SunIcon />
          </CircleButton>
        </HeaderEnd>
      </Header>

      <main className="home__content">
        <section aria-label="Proyecto destacado" className="home__featured">
          <HomeProjectCard index={0} onOpen={onProjectOpen} project={projects[0]} reducedMotion={reducedMotion} />
          <div className="home__dialogue-scene">
            <img
              alt="QB, personaje guía del portfolio"
              className="home__mascot"
              src={`${assetPath}qb.png`}
            />
            <div className="home__dialogue-panel">
              <p className="home__dialogue-speaker">Hola!</p>
              <p className="home__dialogue-message">
                ¿Querés ver cómo convierto ideas en sistemas reales?
              </p>
              <div className="home__dialogue-options">
                <span>SI</span>
                <span>NO</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="selected-work-title" className="home__selected">
          <h2 id="selected-work-title">SELECTED WORK</h2>
          <div className="home__projects-grid">
            {projects.slice(1).map((project, index) => <HomeProjectCard index={index + 1} key={project.slug} onOpen={onProjectOpen} project={project} reducedMotion={reducedMotion} />)}
          </div>
        </section>
      </main>

      </div>
      <Dialog onOpenChange={(open) => { if (!open) closeAccessDialog() }} open={pendingProject !== null}>
        <form className="home__access-form" onSubmit={submitAccessCode}>
          <DialogHeader>
            <DialogTitle>Acceso al proyecto</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>Este proyecto está protegido. Ingresá el código indicado en el CV.</DialogDescription>
            <CodeInput
              autoComplete="one-time-code"
              className="home__access-code"
              helperText={accessError ? <span role="alert">Código incorrecto.</span> : undefined}
              inputMode="numeric"
              label="Código de acceso"
              onChange={(event) => {
                setAccessCode(event.target.value.replace(/\D/g, ''))
                setAccessError(false)
              }}
              pattern="[0-9]*"
              status={accessError ? 'danger' : 'default'}
              value={accessCode}
            />
          </DialogBody>
          <DialogFooter>
            <Button onClick={closeAccessDialog} variant="ghost">Cancelar</Button>
            <Button type="submit">Acceder</Button>
          </DialogFooter>
        </form>
      </Dialog>
      <PortfolioDetailSheet backgroundRef={backgroundRef} labelledBy={titleId} onClose={detailTransition.close} open={selectedProject !== null} returnFocusRef={detailTransition.returnFocusRef} surfaceRef={detailTransition.surfaceRef}>
        <PortfolioDetailSheetHeader className="home__detail-header">
          <h2 id={titleId}>{selectedProject?.title}</h2>
          <p>{selectedProject?.metadata}</p>
        </PortfolioDetailSheetHeader>
        <PortfolioDetailSheetBody className="home__detail-body">
          {selectedProject ? (
            <>
              <p>Detalle placeholder de {selectedProject.title}.</p>
              <img alt={selectedProject.alt} className="home__detail-media" src={`${assetPath}${selectedProject.media}`} />
              <p>Project ID: {selectedProject.slug}</p>
              <p>Este contenido será reemplazado por el case study definitivo.</p>
            </>
          ) : null}
        </PortfolioDetailSheetBody>
        <PortfolioDetailSheetFooter>
          <CircleButton aria-label="Cerrar detalle" onClick={detailTransition.close} size={36} variant="outline">
            <CollapseIcon />
          </CircleButton>
        </PortfolioDetailSheetFooter>
      </PortfolioDetailSheet>
    </div>
  )
}
