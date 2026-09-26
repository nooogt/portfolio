import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Button, type ButtonSize } from '../../components/ui/Button'
import {
  CircleButton,
  type CircleButtonSize,
} from '../../components/ui/CircleButton'
import { Input } from '../../components/ui/Input'
import './UiPrimitivesRoute.css'

const buttonSizes: ButtonSize[] = [36, 46, 56]
const circleButtonSizes: CircleButtonSize[] = [36, 40, 46, 48, 56]

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

  return (
    <div className="ui-primitives">
      <header className="ui-primitives__header">
        <p className="ui-primitives__eyebrow">INTERNAL / DEV ONLY</p>
        <h1>DESIGN SYSTEM LAB</h1>
        <p>Use Tab / Shift+Tab para probar navegación por teclado.</p>
        <p className="ui-primitives__planned">
          Próximamente: 05 — DIALOG · 06 — CARD · 07 — NAVIGATION
        </p>
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
    </div>
  )
}
