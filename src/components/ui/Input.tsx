import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import './Input.css'

export type InputStatus = 'default' | 'success' | 'danger' | 'warning'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode
  status?: InputStatus
  helperText?: ReactNode
  helperIcon?: ReactNode
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

export function Input({
  label,
  status = 'default',
  helperText,
  helperIcon,
  startAdornment,
  endAdornment,
  className,
  id,
  disabled,
  required,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...inputProps
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? `input-${generatedId}`
  const helperId = `${inputId}-helper`
  const describedBy = helperText
    ? [ariaDescribedBy, helperId].filter(Boolean).join(' ')
    : ariaDescribedBy
  const invalid = status === 'danger' ? (ariaInvalid ?? true) : ariaInvalid
  const classes = ['input', `input--${status}`, disabled && 'input--disabled']
    .filter(Boolean)
    .join(' ')
  const nativeClasses = ['input__native', className].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {label ? (
        <label className="input__label" htmlFor={inputId}>
          {label}
          {required ? (
            <span aria-hidden="true" className="input__required">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="input__control">
        {startAdornment ? (
          <span className="input__adornment input__adornment--start">
            {startAdornment}
          </span>
        ) : null}

        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className={nativeClasses}
          disabled={disabled}
          id={inputId}
          required={required}
        />

        {endAdornment ? (
          <span className="input__adornment input__adornment--end">
            {endAdornment}
          </span>
        ) : null}
      </div>

      {helperText ? (
        <div className="input__helper" id={helperId}>
          {helperIcon ? (
            <span className="input__helper-icon">{helperIcon}</span>
          ) : null}
          <span>{helperText}</span>
        </div>
      ) : null}
    </div>
  )
}
