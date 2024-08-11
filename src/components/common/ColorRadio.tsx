import { Icon } from '@yeonsubaek/yeonsui'
import React, { CSSProperties, ChangeEvent, useMemo } from 'react'

interface ColorRadioProps {
  id: string
  name: string
  value: string
  checked?: boolean
  onChange?: (val: boolean) => void
  disabled?: boolean
  style?: CSSProperties
}

function ColorRadio({
  id,
  name,
  value,
  checked = false,
  onChange = () => {},
  disabled = false,
  style = {},
}: ColorRadioProps) {
  return (
    <div style={style} className="color-radio">
      <input
        className="color-radio-input"
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <label className="color-radio-label" htmlFor={id}></label>
    </div>
  )
}

export default ColorRadio
