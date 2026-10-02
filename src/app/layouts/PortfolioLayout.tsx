import { useRef } from 'react'
import { Outlet, useLinkClickHandler, useLocation } from 'react-router-dom'
import { Footer, FooterContent } from '../../components/ui/Footer'
import { NavigationBar } from '../../components/ui/NavigationBar'
import { NavigationItem } from '../../components/ui/NavigationItem'
import { PortfolioContactLauncher } from '../../components/portfolio/PortfolioContactLauncher'
import './PortfolioLayout.css'

export function PortfolioLayout() {
  const backgroundRef = useRef<HTMLDivElement | null>(null)
  const { pathname } = useLocation()
  const onHomeClick = useLinkClickHandler<HTMLAnchorElement>('/')
  const onAboutClick = useLinkClickHandler<HTMLAnchorElement>('/about')

  return (
    <div className="portfolio-layout" ref={backgroundRef}>
      <div className="portfolio-layout__route">
        <Outlet context={backgroundRef} />
      </div>
      <div className="portfolio-layout__footer-slot">
        <Footer className="portfolio-layout__footer">
          <FooterContent className="portfolio-layout__footer-content">
            <NavigationBar aria-label="Navegación principal">
              <NavigationItem active={pathname === '/'} as="a" href="/" onClick={onHomeClick}>HOME</NavigationItem>
              <NavigationItem active={pathname === '/about'} as="a" href="/about" onClick={onAboutClick}>ABOUT</NavigationItem>
            </NavigationBar>
            <PortfolioContactLauncher />
          </FooterContent>
        </Footer>
      </div>
    </div>
  )
}
