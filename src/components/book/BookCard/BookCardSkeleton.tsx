import { Card } from '@yeonsubaek/yeonsui'
import React from 'react'

interface BookCardSkeletonProps {
  id: string
  title: string
  info: string
}

const BookCardSkeleton = ({ id, title, info }: BookCardSkeletonProps) => {
  return (
    <li className="book-card" key={title}>
      <Card id={id} title={title} info={info} />
    </li>
  )
}

export default BookCardSkeleton
