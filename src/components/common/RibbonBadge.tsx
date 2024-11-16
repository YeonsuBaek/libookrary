import React, { CSSProperties } from 'react'

interface RibbonBadgeProps {
  value: string
  style?: CSSProperties
}
const RibbonBadge = ({ value, style = {} }: RibbonBadgeProps) => {
  return (
    <div className="ribbon-badge" style={style}>
      {value}
    </div>
  )
}

export default RibbonBadge
