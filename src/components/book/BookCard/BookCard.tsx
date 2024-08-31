'use client'
import Card from '@/components/common/Card'
import { useRouter } from 'next/navigation'

interface BookCardProps {
  isbn: string
  title: string
  author: string
  cover: string
  route?: string
  width?: number
}

function BookCard({ isbn, title, author, cover, route = '', width }: BookCardProps) {
  const router = useRouter()

  return (
    <li className="book-card" key={title} id={isbn} style={{ width: width || 'auto' }}>
      <button
        className="book-card-button"
        onClick={() => {
          router.push(`/book${route}/${isbn}`)
        }}
      >
        <Card id={`book-card-${title}`} title={title} info={author} image={cover} width={width} />
      </button>
    </li>
  )
}

export default BookCard
