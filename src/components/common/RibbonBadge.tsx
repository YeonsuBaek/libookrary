import React, { CSSProperties } from 'react'

interface RibbonBadgeProps {
  value: string
  color?: 'default' | 'blue' | 'pink' | 'red' | 'orange' | 'cyan' | 'green' | 'purple'
  style?: CSSProperties
}
const RibbonBadge = ({ value, color = 'default', style = {} }: RibbonBadgeProps) => {
  return (
    <div className={`ribbon-badge ${color}`} style={style}>
      {value}
    </div>
  )
}

export default RibbonBadge
