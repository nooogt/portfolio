import { useId, useRef, useState } from 'react'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { CircleButton } from '../../components/ui/CircleButton'
import { Footer, FooterContent } from '../../components/ui/Footer'
import { Header, HeaderContent, HeaderEnd } from '../../components/ui/Header'
import { NavigationBar } from '../../components/ui/NavigationBar'
import { NavigationItem } from '../../components/ui/NavigationItem'
import { PortfolioContactLauncher } from '../../components/portfolio/PortfolioContactLauncher'
import { PortfolioDetailSheet, PortfolioDetailSheetBody, PortfolioDetailSheetFooter, PortfolioDetailSheetHeader } from '../../components/portfolio/PortfolioDetailSheet'
import './HomeRoute.css'

const assetPath = '/home-assets/'

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
  featured?: boolean
  tall?: boolean
}

const projects: HomeProject[] = [
  { slug: 'prototype-factory', title: 'PROTOTYPE FACTORY', media: 'prototype-factory-media.png', alt: 'Vista de carpetas y documentos de Prototype Factory', metadata: 'AI · Design Systems · Prototyping', featured: true },
  { slug: 'rampet', title: 'RAMPET', media: 'rampet-media.png', alt: 'Captura de la interfaz móvil de Rampet', metadata: 'Product Design · Mobile · Systems', tall: true },
  { slug: 'hope', title: 'HOPE', media: 'hope-media.png', alt: 'Arte de la aplicación Hope', metadata: 'Product Design · Mobile · Systems' },
  { slug: 'conexcom', title: 'CONEXCOM', media: 'conexcom-media.png', alt: 'Captura de un formulario de Conexcom', metadata: 'Product Design · Mobile · Systems' },
]

interface HomeProjectCardProps {
  project: HomeProject
  onOpen: (project: HomeProject, trigger: HTMLButtonElement) => void
}

function HomeProjectCard({ project, onOpen }: HomeProjectCardProps) {
  const { title, media, alt, metadata, featured = false, tall = false } = project
  const linkClasses = [
    'home__card-link',
    featured && 'home__card-link--featured',
    tall && 'home__card-link--tall',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={linkClasses}>
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
      <button aria-label={`Abrir detalle de ${title}`} className="home__card-trigger" onClick={(event) => onOpen(project, event.currentTarget)} type="button" />
    </div>
  )
}

export function HomeRoute() {
  const [selectedProject, setSelectedProject] = useState<HomeProject | null>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)
  const titleId = useId()

  const onProjectOpen = (project: HomeProject, trigger: HTMLButtonElement) => {
    returnFocusRef.current = trigger
    setSelectedProject(project)
  }

  return (
    <div className="home">
      <div aria-hidden="true" className="home__world" />
      <div className="home__page" ref={pageRef}>
      <Header className="home__header">
        <HeaderContent className="home__header-content">
          <div className="home__identity">
            <img
              alt="Retrato de Graciela"
              className="home__avatar"
              src={`${assetPath}graciela-avatar.png`}
            />
            <div className="home__identity-copy">
              <h1>Graciela</h1>
              <div className="home__skill-row">
                <span>Diseño sistemas</span>
                <span aria-hidden="true" className="home__skill-dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
          </div>
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
          <HomeProjectCard onOpen={onProjectOpen} project={projects[0]} />
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
            {projects.slice(1).map((project) => <HomeProjectCard key={project.slug} onOpen={onProjectOpen} project={project} />)}
          </div>
        </section>
      </main>

      <Footer className="home__footer">
        <FooterContent className="home__footer-content">
          <NavigationBar aria-label="Navegación principal">
            <NavigationItem active as="a" href="/">
              HOME
            </NavigationItem>
            <NavigationItem as="a" href="/about">
              ABOUT
            </NavigationItem>
          </NavigationBar>
          <PortfolioContactLauncher />
        </FooterContent>
      </Footer>
      </div>
      <PortfolioDetailSheet backgroundRef={pageRef} labelledBy={titleId} onClose={() => setSelectedProject(null)} open={selectedProject !== null} returnFocusRef={returnFocusRef}>
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
          <CircleButton aria-label="Volver a proyectos" onClick={() => setSelectedProject(null)} size={36} variant="outline">
            <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
          </CircleButton>
        </PortfolioDetailSheetFooter>
      </PortfolioDetailSheet>
    </div>
  )
}
