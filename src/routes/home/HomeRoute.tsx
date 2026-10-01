import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { CircleButton } from '../../components/ui/CircleButton'
import { Footer, FooterContent } from '../../components/ui/Footer'
import { Header, HeaderContent, HeaderEnd } from '../../components/ui/Header'
import { NavigationBar } from '../../components/ui/NavigationBar'
import { NavigationItem } from '../../components/ui/NavigationItem'
import { PortfolioContactLauncher } from '../../components/portfolio/PortfolioContactLauncher'
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

interface HomeProjectCardProps {
  title: string
  slug: string
  media: string
  alt: string
  featured?: boolean
  tall?: boolean
}

function HomeProjectCard({
  title,
  slug,
  media,
  alt,
  featured = false,
  tall = false,
}: HomeProjectCardProps) {
  const linkClasses = [
    'home__card-link',
    featured && 'home__card-link--featured',
    tall && 'home__card-link--tall',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a className={linkClasses} href={`/projects/${slug}`}>
      <Card className="home__card">
        <CardHeader className="home__card-header">
          {featured ? (
            <h2 className="home__card-title">{title}</h2>
          ) : (
            <h3 className="home__card-title">{title}</h3>
          )}
          <p className="home__card-meta">
            {featured
              ? 'AI · Design Systems · Prototyping'
              : 'Product Design · Mobile · Systems'}
          </p>
        </CardHeader>
        <CardBody className="home__card-body">
          <img
            alt={alt}
            className="home__card-media"
            src={`${assetPath}${media}`}
          />
        </CardBody>
      </Card>
    </a>
  )
}

export function HomeRoute() {
  return (
    <div className="home">
      <div aria-hidden="true" className="home__world" />
      <div className="home__page">
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
          <HomeProjectCard
            alt="Vista de carpetas y documentos de Prototype Factory"
            featured
            media="prototype-factory-media.png"
            slug="prototype-factory"
            title="PROTOTYPE FACTORY"
          />
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
            <HomeProjectCard
              alt="Captura de la interfaz móvil de Rampet"
              media="rampet-media.png"
              slug="rampet"
              tall
              title="RAMPET"
            />
            <HomeProjectCard
              alt="Arte de la aplicación Hope"
              media="hope-media.png"
              slug="hope"
              title="HOPE"
            />
            <HomeProjectCard
              alt="Captura de un formulario de Conexcom"
              media="conexcom-media.png"
              slug="conexcom"
              title="CONEXCOM"
            />
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
    </div>
  )
}
