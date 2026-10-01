import { useRef, useState } from 'react'
import { CircleButton } from '../../components/ui/CircleButton'
import { Footer, FooterContent } from '../../components/ui/Footer'
import { Header, HeaderContent, HeaderEnd } from '../../components/ui/Header'
import { NavigationBar } from '../../components/ui/NavigationBar'
import { NavigationItem } from '../../components/ui/NavigationItem'
import { PortfolioContactLauncher } from '../../components/portfolio/PortfolioContactLauncher'
import { AboutDetailSheet } from './AboutDetailSheet'
import './AboutRoute.css'

type Section = 'section-01' | 'section-02' | 'section-03'

const sections: { id: Section; number: string }[] = [
  { id: 'section-01', number: 'SECTION 01' },
  { id: 'section-02', number: 'SECTION 02' },
  { id: 'section-03', number: 'SECTION 03' },
]

function SunIcon() {
  return (
    <svg aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42 1.42" />
    </svg>
  )
}

export function AboutRoute() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const returnFocusRef = useRef<HTMLButtonElement | null>(null)
  const selected = sections.find((section) => section.id === selectedSection)

  return (
    <div className="about">
      <div aria-hidden="true" className="about__world" />
      <div className="about__page" inert={selectedSection !== null}>
        <Header className="about__header">
          <HeaderContent className="about__header-content">
            <div className="about__identity">
              <img alt="Retrato de Graciela" className="about__avatar" src="/home-assets/graciela-avatar.png" />
              <div className="about__identity-copy">
                <span className="about__identity-name">Graciela</span>
                <div className="about__skill-row">
                  <span>Diseño sistemas</span>
                  <span aria-hidden="true" className="about__skill-dots"><i /><i /><i /></span>
                </div>
              </div>
            </div>
          </HeaderContent>
          <HeaderEnd className="about__header-end">
            <CircleButton aria-disabled="true" aria-label="Cambiar tema (próximamente)" tabIndex={-1} variant="outline"><SunIcon /></CircleButton>
          </HeaderEnd>
        </Header>

        <main className="about__main">
          <h1>ABOUT</h1>
          <div className="about__sections">
            {sections.map((section) => (
              <button className="about__selector" key={section.id} onClick={(event) => { returnFocusRef.current = event.currentTarget; setSelectedSection(section.id) }} type="button">
                <span>{section.number}</span>
                <span>Section label</span>
              </button>
            ))}
          </div>
        </main>

        <Footer className="about__footer">
          <FooterContent className="about__footer-content">
            <NavigationBar aria-label="Navegación principal">
              <NavigationItem as="a" href="/">HOME</NavigationItem>
              <NavigationItem active as="a" href="/about">ABOUT</NavigationItem>
            </NavigationBar>
            <PortfolioContactLauncher />
          </FooterContent>
        </Footer>
      </div>
      <AboutDetailSheet key={selectedSection ?? 'closed'} onClose={() => setSelectedSection(null)} open={selectedSection !== null} returnFocusRef={returnFocusRef} title={selected?.number ?? ''} />
    </div>
  )
}
