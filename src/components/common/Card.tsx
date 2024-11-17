import React from 'react'

interface CardProps {
  id: string
  title: string
  info?: string
  image?: string
  onClick?: () => void
  width?: number
}

const Card = ({ id, title, info, image, onClick, width }: CardProps) => {
  return (
    <figure id={id} className="card" role="button" onClick={onClick} style={{ width: width || 'auto' }}>
      <img className={`card-image ${image ? '' : 'blank'}`} src={image} alt={title} />
      <figcaption className="card-figcaption">
        <span className="card-figcaption-title">{title}</span>
        {info && <span className="card-figcaption-info">{info}</span>}
      </figcaption>
    </figure>
  )
}

export default Card
