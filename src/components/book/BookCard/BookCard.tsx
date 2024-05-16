'use client'
import { Card } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'

interface BookCardProps {
  isbn: string
  title: string
  author: string
  cover: string
}

function BookCard({ isbn, title, author, cover }: BookCardProps) {
  const router = useRouter()

  return (
    <li className="book-card" key={title}>
      <button className="book-card-button" onClick={() => router.push(`/book/${isbn}`)}>
        <Card title={title} info={author} image={cover} />
      </button>
    </li>
  )
}

export default BookCard
