import Card from '@/components/common/Card'
import React from 'react'

interface BookCardSkeletonProps {
  id: string
  title: string
  info: string
  width?: number
}

const BookCardSkeleton = ({ id, title, info, width }: BookCardSkeletonProps) => {
  return (
    <li className="book-card" key={title} style={{ width: width || 'auto' }}>
      <Card id={id} title={title} info={info} width={width} />
    </li>
  )
}

export default BookCardSkeleton
