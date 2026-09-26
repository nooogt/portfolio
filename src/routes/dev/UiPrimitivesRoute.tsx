import { Button, type ButtonSize } from '../../components/ui/Button'
import {
  CircleButton,
  type CircleButtonSize,
} from '../../components/ui/CircleButton'
import './UiPrimitivesRoute.css'

const buttonSizes: ButtonSize[] = [36, 46, 56]
const circleButtonSizes: CircleButtonSize[] = [36, 40, 46, 48, 56]

export function UiPrimitivesRoute() {
  return (
    <div className="ui-primitives">
      <h1>UI PRIMITIVES</h1>

      <section className="ui-primitives__section">
        <h2>BUTTON</h2>
        {buttonSizes.map((size) => (
          <div className="ui-primitives__row" key={size}>
            <span className="ui-primitives__label">{size}px</span>
            <Button size={size}>PRIMARY</Button>
            <Button size={size} variant="outline">
              OUTLINE
            </Button>
            <Button size={size} variant="ghost">
              GHOST
            </Button>
          </div>
        ))}
      </section>

      <section className="ui-primitives__section">
        <h2>CIRCLE BUTTON</h2>
        {circleButtonSizes.map((size) => (
          <div className="ui-primitives__row" key={size}>
            <span className="ui-primitives__label">{size}px</span>
            <CircleButton
              aria-label={`Secondary circle button, ${size}px`}
              size={size}
              variant="secondary"
            >
              ●
            </CircleButton>
            <CircleButton
              aria-label={`Outline circle button, ${size}px`}
              size={size}
              variant="outline"
            >
              ←
            </CircleButton>
            <CircleButton
              aria-label={`Ghost circle button, ${size}px`}
              size={size}
              variant="ghost"
            >
              ×
            </CircleButton>
          </div>
        ))}
      </section>
    </div>
  )
}
