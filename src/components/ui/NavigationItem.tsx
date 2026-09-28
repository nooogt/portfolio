import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import './NavigationItem.css'

/** Pencil source mapping: NavigationItem <- WM4lI + G2xwmk / TabItem. */
interface NavigationItemCommonProps {
  active?: boolean
  startIcon?: ReactNode
  children: ReactNode
}

type NavigationItemButtonProps = NavigationItemCommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    keyof NavigationItemCommonProps
  > & {
    as?: 'button'
  }

type NavigationItemAnchorProps = NavigationItemCommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof NavigationItemCommonProps
  > & {
    as: 'a'
  }

export type NavigationItemProps =
  | NavigationItemButtonProps
  | NavigationItemAnchorProps

export function NavigationItem(props: NavigationItemProps) {
  const { active = false, startIcon, children, className } = props
  const classes = [
    'navigation-item',
    active ? 'navigation-item--active' : 'navigation-item--inactive',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const content = (
    <>
      {startIcon ? (
        <span aria-hidden="true" className="navigation-item__start">
          {startIcon}
        </span>
      ) : null}
      <span className="navigation-item__label">{children}</span>
    </>
  )

  if (props.as === 'a') {
    const {
      as: _as,
      active: _active,
      startIcon: _startIcon,
      children: _children,
      className: _className,
      ...anchorProps
    } = props

    return (
      <a
        {...anchorProps}
        aria-current={active ? 'page' : undefined}
        className={classes}
      >
        {content}
      </a>
    )
  }

  const {
    as: _as,
    active: _active,
    startIcon: _startIcon,
    children: _children,
    className: _className,
    type = 'button',
    ...buttonProps
  } = props

  return (
    <button
      {...buttonProps}
      aria-pressed={active}
      className={classes}
      type={type}
    >
      {content}
    </button>
  )
}
