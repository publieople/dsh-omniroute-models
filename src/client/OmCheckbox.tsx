/**
 * OmCheckbox — DSH-themed wrapper over @radix-ui/react-checkbox.
 * ARIA checkbox keyboard/focus handled by Radix; styled with DSH `--dsw-*` tokens.
 */
import * as Checkbox from '@radix-ui/react-checkbox'
import type { CSSProperties } from 'react'
import { MorphIcon, type IconNode } from 'morphicons/react'

interface OmCheckboxProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  'aria-label'?: string
  className?: string
  style?: CSSProperties
}

const IconCheck: IconNode = [['path', { d: 'M20 6 9 17l-5-5' }]]

export function OmCheckbox({ checked, onCheckedChange, 'aria-label': ariaLabel, className, style }: OmCheckboxProps) {
  return (
    <Checkbox.Root
      className={'om-checkbox' + (className ? ' ' + className : '')}
      checked={checked}
      onCheckedChange={onCheckedChange}
      aria-label={ariaLabel}
      style={style}
    >
      <Checkbox.Indicator className="om-checkbox-ind">
        <MorphIcon icon={IconCheck} size={12} strokeWidth={3} />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
