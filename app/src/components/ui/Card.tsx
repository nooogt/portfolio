import type { HTMLAttributes } from 'react'
import './Card.css'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const classes = ['card', className].filter(Boolean).join(' ')
  return <div className={classes} {...props} />
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const classes = ['card__header', className].filter(Boolean).join(' ')
  return <div className={classes} {...props} />
}

export function CardBody({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const classes = ['card__body', className].filter(Boolean).join(' ')
  return <div className={classes} {...props} />
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const classes = ['card__footer', className].filter(Boolean).join(' ')
  return <div className={classes} {...props} />
}
