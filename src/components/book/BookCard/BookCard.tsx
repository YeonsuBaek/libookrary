'use client'
import { Card } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'

interface BookCardProps {
  isbn: string
  title: string
  author: string
  cover: string
  route?: string
}

function BookCard({ isbn, title, author, cover, route = '' }: BookCardProps) {
  const router = useRouter()

  return (
    <li className="book-card" key={title}>
      <button className="book-card-button" onClick={() => router.push(`/book${route}/${isbn}`)}>
        <Card title={title} info={author} image={cover} />
      </button>
    </li>
  )
}

export default BookCard
