import { useId, useRef, useState } from 'react'
import type {
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react'
import './CodeInput.css'

export type CodeInputStatus = 'default' | 'success' | 'danger' | 'warning'

export interface CodeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'maxLength'> {
  length?: number
  label?: ReactNode
  status?: CodeInputStatus
  helperText?: ReactNode
  helperIcon?: ReactNode
}

export function CodeInput({
  length = 6,
  label,
  status = 'default',
  helperText,
  helperIcon,
  className,
  id,
  disabled,
  required,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  onSelect,
  onClick,
  onKeyUp,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...inputProps
}: CodeInputProps) {
  const cellCount = Number.isSafeInteger(length) && length > 0 ? length : 6
  const generatedId = useId()
  const inputId = id ?? `code-input-${generatedId}`
  const helperId = `${inputId}-helper`
  const inputRef = useRef<HTMLInputElement>(null)
  const [uncontrolledValue, setUncontrolledValue] = useState(
    String(defaultValue ?? ''),
  )
  const [focused, setFocused] = useState(false)
  const [caret, setCaret] = useState(0)
  const displayValue = value !== undefined ? String(value ?? '') : uncontrolledValue
  const characters = Array.from(displayValue).slice(0, cellCount)
  const activeCell = Math.min(caret, cellCount - 1)
  const invalid = status === 'danger' ? (ariaInvalid ?? true) : ariaInvalid
  const describedBy = helperText
    ? [ariaDescribedBy, helperId].filter(Boolean).join(' ')
    : ariaDescribedBy
  const classes = [
    'code-input',
    `code-input--${status}`,
    disabled && 'code-input--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  function syncCaret(input: HTMLInputElement) {
    setCaret(input.selectionStart ?? input.value.length)
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (value === undefined) setUncontrolledValue(event.target.value)
    syncCaret(event.target)
    onChange?.(event)
  }

  function handleCellClick(event: MouseEvent<HTMLDivElement>) {
    if (disabled) return
    const cell = (event.target as HTMLElement).closest<HTMLElement>(
      '[data-code-cell]',
    )
    const index = Number(cell?.dataset.codeCell)
    const input = inputRef.current
    if (!cell || !input || !Number.isInteger(index)) return
    const position = Math.min(index, input.value.length)
    input.focus()
    input.setSelectionRange(position, position)
    syncCaret(input)
  }

  return (
    <div className={classes} data-component="CodeInput">
      {label ? (
        <label className="code-input__label" htmlFor={inputId}>
          {label}
          {required ? (
            <span aria-hidden="true" className="code-input__required">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="code-input__control">
        <input
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={invalid}
          className="code-input__native"
          defaultValue={defaultValue}
          disabled={disabled}
          id={inputId}
          maxLength={cellCount}
          onBlur={(event) => {
            setFocused(false)
            onBlur?.(event)
          }}
          onChange={handleChange}
          onClick={(event) => {
            syncCaret(event.currentTarget)
            onClick?.(event)
          }}
          onFocus={(event) => {
            setFocused(true)
            syncCaret(event.currentTarget)
            onFocus?.(event)
          }}
          onKeyUp={(event) => {
            syncCaret(event.currentTarget)
            onKeyUp?.(event)
          }}
          onSelect={(event) => {
            syncCaret(event.currentTarget)
            onSelect?.(event)
          }}
          ref={inputRef}
          required={required}
          type="text"
          value={value}
        />
        <div
          aria-hidden="true"
          className="code-input__group"
          onClick={handleCellClick}
        >
          {Array.from({ length: cellCount }, (_, index) => (
            <span
              className="code-input__cell"
              data-active={
                !disabled && status === 'default' && focused && index === activeCell
                  ? 'true'
                  : undefined
              }
              data-code-cell={index}
              key={index}
            >
              {characters[index] ?? ''}
            </span>
          ))}
        </div>
      </div>

      {helperText ? (
        <div className="code-input__helper" id={helperId}>
          {helperIcon ? (
            <span className="code-input__helper-icon">{helperIcon}</span>
          ) : null}
          <span>{helperText}</span>
        </div>
      ) : null}
    </div>
  )
}
