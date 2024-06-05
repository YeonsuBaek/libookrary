'use client'
import { useSearchStore } from '@/stores/search'
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
  const { isOpenSearch, setIsOpenSearch } = useSearchStore()

  return (
    <li className="book-card" key={title}>
      <button
        className="book-card-button"
        onClick={() => {
          router.push(`/book${route}/${isbn}`)
          if (isOpenSearch) setIsOpenSearch(false)
        }}
      >
        <Card id={`book-card-${title}`} title={title} info={author} image={cover} />
      </button>
    </li>
  )
}

export default BookCard
