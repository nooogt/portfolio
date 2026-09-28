import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import './CircleButton.css'

export type CircleButtonVariant = 'secondary' | 'outline' | 'ghost'
export type CircleButtonSize = 36 | 40 | 46 | 48 | 56

interface CircleButtonCommonProps {
  variant: CircleButtonVariant
  size?: CircleButtonSize
  'aria-label': string
  children: ReactNode
}

type CircleButtonButtonProps = CircleButtonCommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CircleButtonCommonProps> & {
    as?: 'button'
  }

type CircleButtonAnchorProps = CircleButtonCommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CircleButtonCommonProps> & {
    as: 'a'
    href: string
  }

export type CircleButtonProps =
  | CircleButtonButtonProps
  | CircleButtonAnchorProps

export function CircleButton(props: CircleButtonProps) {
  const { variant, size = 56, className, children } = props
  const classes = [
    'circle-button',
    `circle-button--${variant}`,
    `circle-button--size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const content = <span className="circle-button__icon">{children}</span>

  if (props.as === 'a') {
    const {
      as: _as,
      variant: _variant,
      size: _size,
      children: _children,
      className: _className,
      ...anchorProps
    } = props

    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    )
  }

  const {
    as: _as,
    variant: _variant,
    size: _size,
    children: _children,
    className: _className,
    type = 'button',
    ...buttonProps
  } = props

  return (
    <button className={classes} type={type} {...buttonProps}>
      {content}
    </button>
  )
}
