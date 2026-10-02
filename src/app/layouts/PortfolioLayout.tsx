import { useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, FooterContent } from '../../components/ui/Footer'
import { PortfolioContactLauncher } from '../../components/portfolio/PortfolioContactLauncher'
import { PortfolioNavigation } from '../../components/portfolio/PortfolioNavigation'
import './PortfolioLayout.css'

export function PortfolioLayout() {
  const backgroundRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="portfolio-layout" ref={backgroundRef}>
      <div className="portfolio-layout__route">
        <Outlet context={backgroundRef} />
      </div>
      <div className="portfolio-layout__footer-slot">
        <Footer className="portfolio-layout__footer">
          <FooterContent className="portfolio-layout__footer-content">
            <PortfolioNavigation />
            <PortfolioContactLauncher />
          </FooterContent>
        </Footer>
      </div>
    </div>
  )
}
