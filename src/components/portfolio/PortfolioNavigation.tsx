import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react'
import { useLinkClickHandler, useLocation } from 'react-router-dom'
import { NavigationBar } from '../ui/NavigationBar'
import { NavigationItem } from '../ui/NavigationItem'
import './PortfolioNavigation.css'

function HomeIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
    </svg>
  )
}

function AboutIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  )
}

interface PortfolioNavigationLinkProps {
  active: boolean
  href: '/' | '/about'
  icon: React.ReactNode
  label: 'HOME' | 'ABOUT'
  reducedMotion: boolean
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 32, mass: 0.8 }
const labelTransition = { duration: 0.16, ease: 'easeOut' as const }
const labelExitTransition = { duration: 0.09, ease: 'easeOut' as const }

function PortfolioNavigationLink({ active, href, icon, label, reducedMotion }: PortfolioNavigationLinkProps) {
  const onClick = useLinkClickHandler<HTMLAnchorElement>(href)

  return (
    <motion.div className="portfolio-navigation__item" layout={!reducedMotion} transition={spring}>
      {active && (
        <motion.span
          aria-hidden="true"
          className="portfolio-navigation__pill"
          layoutId={reducedMotion ? undefined : 'active-pill'}
          transition={spring}
        />
      )}
      <NavigationItem
        active={active}
        aria-label={label === 'HOME' ? 'Home' : 'About'}
        as="a"
        className="portfolio-navigation__link"
        href={href}
        onClick={onClick}
        startIcon={icon}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {active && (
            <motion.span
              className="portfolio-navigation__label"
              initial={reducedMotion ? false : { opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -4, transition: labelExitTransition }}
              transition={reducedMotion ? { duration: 0 } : labelTransition}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </NavigationItem>
    </motion.div>
  )
}

export function PortfolioNavigation() {
  const { pathname } = useLocation()
  const reducedMotion = useReducedMotion() ?? false

  return (
    <LayoutGroup id="portfolio-navigation">
      <NavigationBar aria-label="Navegación principal" className="portfolio-navigation">
        <PortfolioNavigationLink active={pathname === '/'} href="/" icon={<HomeIcon />} label="HOME" reducedMotion={reducedMotion} />
        <PortfolioNavigationLink active={pathname === '/about'} href="/about" icon={<AboutIcon />} label="ABOUT" reducedMotion={reducedMotion} />
      </NavigationBar>
    </LayoutGroup>
  )
}
