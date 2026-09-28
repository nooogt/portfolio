import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Button, type ButtonSize } from '../../components/ui/Button'
import {
  CircleButton,
  type CircleButtonSize,
} from '../../components/ui/CircleButton'
import { Input } from '../../components/ui/Input'
import { Card, CardBody, CardFooter, CardHeader } from '../../components/ui/Card'
import { NavigationBar } from '../../components/ui/NavigationBar'
import { NavigationItem } from '../../components/ui/NavigationItem'
import {
  Header,
  HeaderContent,
  HeaderEnd,
  HeaderStart,
} from '../../components/ui/Header'
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/Dialog'
import './UiPrimitivesRoute.css'

const buttonSizes: ButtonSize[] = [36, 46, 56]
const circleButtonSizes: CircleButtonSize[] = [36, 40, 46, 48, 56]
const navigationItems = ['Home', 'Work', 'About'] as const

const colorTokenGroups = [
  {
    label: 'Brand',
    tokens: [
      '--color-brand-primary',
      '--color-brand-primary-strong',
      '--color-brand-secondary',
    ],
  },
  {
    label: 'Background',
    tokens: [
      '--color-bg-screen',
      '--color-bg-surface',
      '--color-bg-inverse',
    ],
  },
  {
    label: 'Text',
    tokens: [
      '--color-text-primary',
      '--color-text-secondary',
      '--color-text-inverse',
    ],
  },
  {
    label: 'Danger',
    tokens: [
      '--color-feedback-danger-border',
      '--color-feedback-danger-text',
      '--color-feedback-danger-icon',
    ],
  },
]

const radiusTokens = [
  '--radius-md',
  '--radius-lg',
  '--radius-xl',
  '--radius-pill',
]

const spacingTokens = [
  '--space-xs',
  '--space-sm',
  '--space-md',
  '--space-lg',
  '--space-xl',
]

function tokenStyle(property: string, token: string) {
  return { [property]: `var(${token})` } as CSSProperties
}

export function UiPrimitivesRoute() {
  const [lastButtonAction, setLastButtonAction] = useState('None')
  const [lastCircleAction, setLastCircleAction] = useState('None')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [baseDialogOpen, setBaseDialogOpen] = useState(false)
  const [formDialogOpen, setFormDialogOpen] = useState(false)
  const [activeNavigation, setActiveNavigation] = useState('Home')

  return (
    <div className="ui-primitives">
      <header className="ui-primitives__header">
        <p className="ui-primitives__eyebrow">INTERNAL / DEV ONLY</p>
        <h1>DESIGN SYSTEM LAB</h1>
        <p>Use Tab / Shift+Tab para probar navegación por teclado.</p>
        <p className="ui-primitives__planned">Próximamente: 09 — FEEDBACK</p>
      </header>

      <section className="ui-primitives__section">
        <h2>01 — TOKENS</h2>
        <div className="ui-primitives__token-groups">
          {colorTokenGroups.map((group) => (
            <div className="ui-primitives__token-group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="ui-primitives__swatches">
                {group.tokens.map((token) => (
                  <div className="ui-primitives__token" key={token}>
                    <span
                      aria-hidden="true"
                      className="ui-primitives__swatch"
                      style={tokenStyle('--lab-token-color', token)}
                    />
                    <code>{token}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="ui-primitives__token-group">
            <h3>Radius</h3>
            <div className="ui-primitives__swatches">
              {radiusTokens.map((token) => (
                <div className="ui-primitives__token" key={token}>
                  <span
                    aria-hidden="true"
                    className="ui-primitives__radius-sample"
                    style={tokenStyle('--lab-token-radius', token)}
                  />
                  <code>{token}</code>
                </div>
              ))}
            </div>
          </div>

          <div className="ui-primitives__token-group">
            <h3>Spacing</h3>
            <div className="ui-primitives__swatches">
              {spacingTokens.map((token) => (
                <div className="ui-primitives__token" key={token}>
                  <span
                    aria-hidden="true"
                    className="ui-primitives__spacing-track"
                  >
                    <span
                      className="ui-primitives__spacing-sample"
                      style={tokenStyle('--lab-token-space', token)}
                    />
                  </span>
                  <code>{token}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ui-primitives__section">
        <h2>02 — BUTTON</h2>
        <p className="ui-primitives__readout" aria-live="polite">
          Last action: {lastButtonAction}
        </p>
        <div className="ui-primitives__examples">
          {buttonSizes.map((size) => (
            <div className="ui-primitives__row" key={size}>
              <span className="ui-primitives__label">{size}px</span>
              <Button
                onClick={() => setLastButtonAction('Primary clicked')}
                size={size}
              >
                PRIMARY
              </Button>
              <Button
                onClick={() => setLastButtonAction('Outline clicked')}
                size={size}
                variant="outline"
              >
                OUTLINE
              </Button>
              <Button
                onClick={() => setLastButtonAction('Ghost clicked')}
                size={size}
                variant="ghost"
              >
                GHOST
              </Button>
            </div>
          ))}
          <div className="ui-primitives__row">
            <span className="ui-primitives__label">disabled</span>
            <Button
              disabled
              onClick={() => setLastButtonAction('Disabled clicked')}
            >
              PRIMARY
            </Button>
            <Button disabled variant="outline">
              OUTLINE
            </Button>
            <Button disabled variant="ghost">
              GHOST
            </Button>
          </div>
        </div>
      </section>

      <section className="ui-primitives__section">
        <h2>03 — CIRCLE BUTTON</h2>
        <p className="ui-primitives__readout" aria-live="polite">
          Last action: {lastCircleAction}
        </p>
        <div className="ui-primitives__circle-matrix">
          <div className="ui-primitives__circle-row ui-primitives__circle-header">
            <span>Size</span>
            <span>SECONDARY</span>
            <span>OUTLINE</span>
            <span>GHOST</span>
          </div>
          {circleButtonSizes.map((size) => (
            <div className="ui-primitives__circle-row" key={size}>
              <span className="ui-primitives__circle-size">{size}px</span>
              <div className="ui-primitives__circle-cell">
                <CircleButton
                  aria-label={`Secondary circle button, ${size}px`}
                  onClick={() => setLastCircleAction('Secondary clicked')}
                  size={size}
                  variant="secondary"
                >
                  ←
                </CircleButton>
              </div>
              <div className="ui-primitives__circle-cell">
                <CircleButton
                  aria-label={`Outline circle button, ${size}px`}
                  onClick={() => setLastCircleAction('Outline clicked')}
                  size={size}
                  variant="outline"
                >
                  ←
                </CircleButton>
              </div>
              <div className="ui-primitives__circle-cell">
                <CircleButton
                  aria-label={`Ghost circle button, ${size}px`}
                  onClick={() => setLastCircleAction('Ghost clicked')}
                  size={size}
                  variant="ghost"
                >
                  ←
                </CircleButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ui-primitives__section">
        <h2>04 — INPUT</h2>
        <div className="ui-primitives__input-grid">
          <div className="ui-primitives__inputs">
            <h3>Static cases</h3>
            <Input label="Nombre" placeholder="Tu nombre" />
            <Input
              label="Usuario"
              placeholder="Tu usuario"
              startAdornment="@"
            />
            <Input label="Búsqueda" placeholder="Buscar" endAdornment="⌕" />
            <Input
              autoComplete="current-password"
              defaultValue="portfolio"
              endAdornment="◉"
              label="Contraseña"
              type="password"
            />
            <div>
              <Input
                defaultValue="incorrecta"
                endAdornment="◉"
                helperIcon="!"
                helperText="Contraseña incorrecta. Revisá la clave incluida en mi CV."
                label="Contraseña"
                status="danger"
                type="password"
              />
              <p className="ui-primitives__technical-readout">
                aria-invalid = true
              </p>
            </div>
          </div>

          <div className="ui-primitives__inputs">
            <h3>Controlled cases</h3>
            <div>
              <Input
                label="Nombre"
                onChange={(event) => setName(event.target.value)}
                placeholder="Escribí tu nombre"
                value={name}
              />
              <p className="ui-primitives__technical-readout">
                Current value: <output>{name || '—'}</output>
              </p>
            </div>
            <div>
              <Input
                autoComplete="current-password"
                endAdornment="◉"
                label="Password controlado"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                value={password}
              />
              <p className="ui-primitives__technical-readout">
                Current value: <output>{password ? '••••••••' : '—'}</output>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ui-primitives__section">
        <h2>05 — DIALOG</h2>
        <p>
          Probá cierre, Escape, click en el scrim, Tab / Shift+Tab, restauración
          de foco y bloqueo de scroll.
        </p>
        <div className="ui-primitives__row">
          <Button onClick={() => setBaseDialogOpen(true)}>
            OPEN BASE DIALOG
          </Button>
          <Button onClick={() => setFormDialogOpen(true)} variant="outline">
            OPEN DIALOG WITH FORM
          </Button>
        </div>

        <Dialog open={baseDialogOpen} onOpenChange={setBaseDialogOpen}>
          <DialogHeader>
            <DialogTitle>DIALOG BASE</DialogTitle>
            <DialogClose>
              <CircleButton aria-label="Cerrar" size={40} variant="ghost">
                ×
              </CircleButton>
            </DialogClose>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>
              Este caso usa el background base del master canónico.
            </DialogDescription>
            <p className="ui-primitives__dialog-copy">
              El contenido se compone dentro del slot Body.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button onClick={() => setBaseDialogOpen(false)}>ENTENDIDO</Button>
          </DialogFooter>
        </Dialog>

        <Dialog
          open={formDialogOpen}
          onOpenChange={setFormDialogOpen}
        >
          <DialogHeader>
            <DialogTitle>DIALOG WITH FORM</DialogTitle>
            <DialogClose>
              <CircleButton aria-label="Cerrar" size={40} variant="ghost">
                ×
              </CircleButton>
            </DialogClose>
          </DialogHeader>
          <DialogBody>
            <DialogDescription>
              Este caso usa la superficie canónica con contenido de formulario.
            </DialogDescription>
            <Input label="Ejemplo de control" placeholder="Contenido compuesto" />
          </DialogBody>
          <DialogFooter>
            <Button
              onClick={() => setFormDialogOpen(false)}
              variant="ghost"
            >
              CANCELAR
            </Button>
            <Button onClick={() => setFormDialogOpen(false)}>CONTINUAR</Button>
          </DialogFooter>
        </Dialog>
      </section>

      <section className="ui-primitives__section">
        <h2>06 — CARD</h2>
        <div className="ui-primitives__card-grid">
          <div className="ui-primitives__card-example">
            <h3>CARD — STRUCTURAL</h3>
            <Card>
              <CardHeader>
                <span className="ui-primitives__card-slot">Header slot</span>
              </CardHeader>
              <CardBody>
                <span className="ui-primitives__card-slot">Body slot</span>
              </CardBody>
              <CardFooter>
                <span className="ui-primitives__card-slot">Footer slot</span>
              </CardFooter>
            </Card>
          </div>

          <div className="ui-primitives__card-example">
            <h3>CARD — CONTENT COMPOSITION</h3>
            <Card>
              <CardHeader className="ui-primitives__card-header-content">
                <span className="ui-primitives__card-eyebrow">CASE STUDY</span>
                <strong className="ui-primitives__card-title">
                  Prototype Factory
                </strong>
              </CardHeader>
              <CardBody>
                <p className="ui-primitives__card-copy">
                  Un sistema reusable para diseñar y validar flujos de producto.
                </p>
              </CardBody>
              <CardFooter>
                <Button size={46}>VER DETALLE</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="ui-primitives__card-example">
            <h3>CARD — MEDIA COMPOSITION</h3>
            <Card>
              <CardHeader className="ui-primitives__card-header-content">
                <strong className="ui-primitives__card-title">
                  Media inside Body
                </strong>
                <span className="ui-primitives__card-caption">
                  Responsive · Local radius · Local shadow
                </span>
              </CardHeader>
              <CardBody>
                <div
                  className="ui-primitives__card-media ui-primitives__card-media--composition"
                  aria-hidden="true"
                >
                  MEDIA PLACEHOLDER
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="ui-primitives__card-example">
            <h3>CARD — CLIPPING STRESS TEST</h3>
            <Card>
              <CardBody>
                <div
                  className="ui-primitives__card-media ui-primitives__card-media--stress"
                  aria-hidden="true"
                >
                  OVERSIZED CONTENT
                </div>
              </CardBody>
              <CardFooter>
                <span className="ui-primitives__card-caption">
                  Stress test: este contenido excede deliberadamente el área
                  normal para validar clipping.
                </span>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="ui-primitives__section">
        <h2>07 — NAVIGATION</h2>
        <h3>NAVIGATION BAR / NAVIGATION ITEM</h3>

        <div className="ui-primitives__navigation-grid">
          <div className="ui-primitives__navigation-example">
            <h3>STATE COMPARISON</h3>
            <div className="ui-primitives__navigation-row">
              <NavigationItem active startIcon="⌂">
                HOME
              </NavigationItem>
              <NavigationItem startIcon="⌂">HOME</NavigationItem>
            </div>
          </div>

          <div className="ui-primitives__navigation-example">
            <h3>REAL COMPOSITION</h3>
            <NavigationBar aria-label="Navegación de ejemplo">
              <NavigationItem active>HOME</NavigationItem>
              <NavigationItem>WORK</NavigationItem>
              <NavigationItem>ABOUT</NavigationItem>
            </NavigationBar>
          </div>

          <div className="ui-primitives__navigation-example">
            <h3>CONTROLLED STATE DEMO</h3>
            <NavigationBar aria-label="Demo de navegación controlada">
              {navigationItems.map((item) => (
                <NavigationItem
                  active={activeNavigation === item}
                  key={item}
                  onClick={() => setActiveNavigation(item)}
                  startIcon="⌂"
                >
                  {item.toUpperCase()}
                </NavigationItem>
              ))}
            </NavigationBar>
            <p className="ui-primitives__technical-readout" aria-live="polite">
              Active navigation: {activeNavigation}
            </p>
          </div>
        </div>

        <p className="ui-primitives__technical-readout">
          El Lab usa buttons nativos para cambiar estado local. El consumer real
          usará links y aria-current=&quot;page&quot; sin acoplar el componente al
          router.
        </p>
      </section>

      <section className="ui-primitives__section">
        <h2>08 — HEADER</h2>

        <div className="ui-primitives__header-grid">
          <div className="ui-primitives__header-example">
            <h3>HEADER — STRUCTURAL</h3>
            <Header>
              <HeaderStart>
                <span className="ui-primitives__header-slot">START</span>
              </HeaderStart>
              <HeaderContent>
                <span className="ui-primitives__header-slot">CONTENT</span>
              </HeaderContent>
              <HeaderEnd>
                <span className="ui-primitives__header-slot">END</span>
              </HeaderEnd>
            </Header>
          </div>

          <div className="ui-primitives__header-example">
            <h3>HEADER — REALISTIC COMPOSITION</h3>
            <Header>
              <HeaderStart>
                <strong className="ui-primitives__header-identity">
                  STUDIO SAMPLE
                </strong>
              </HeaderStart>
              <HeaderEnd>
                <CircleButton
                  aria-label="Acción de ejemplo"
                  size={46}
                  variant="outline"
                >
                  +
                </CircleButton>
              </HeaderEnd>
            </Header>
          </div>

          <div className="ui-primitives__header-example ui-primitives__header-example--brand-surface">
            <h3>HEADER — TRANSPARENT COMPOSITION</h3>
            <Header className="ui-primitives__header-demo--transparent">
              <HeaderContent>
                <strong className="ui-primitives__header-identity">
                  CONSUMER OVERRIDE
                </strong>
                <span className="ui-primitives__header-caption">
                  Background transparente aplicado desde el Lab
                </span>
              </HeaderContent>
              <HeaderEnd>
                <CircleButton
                  aria-label="Acción transparente de ejemplo"
                  size={46}
                  variant="outline"
                >
                  +
                </CircleButton>
              </HeaderEnd>
            </Header>
          </div>

          <div className="ui-primitives__header-example">
            <h3>HEADER — LONG CONTENT QA</h3>
            <Header>
              <HeaderStart>
                <span className="ui-primitives__header-caption">START</span>
              </HeaderStart>
              <HeaderContent>
                <strong className="ui-primitives__header-identity">
                  Encabezado con contenido variable y deliberadamente más largo
                </strong>
                <span className="ui-primitives__header-caption">
                  El contenido puede envolver sin ocultar la acción final.
                </span>
              </HeaderContent>
              <HeaderEnd>
                <CircleButton
                  aria-label="Acción persistente de ejemplo"
                  size={40}
                  variant="ghost"
                >
                  →
                </CircleButton>
              </HeaderEnd>
            </Header>
          </div>
        </div>
      </section>
    </div>
  )
}
