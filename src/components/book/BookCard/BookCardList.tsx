'use client'
import { UserBookType } from '@/types/book'
import BookCard from './BookCard'
import BookCardSkeleton from './BookCardSkeleton'
import { useTranslation } from 'react-i18next'

interface BookCardListProps {
  books: UserBookType[]
  sort?: 'wrap' | 'nowrap'
  isAddRoute?: boolean
}

interface GettingBookType extends UserBookType {
  isbn13?: string
}

function BookCardList({ books, sort = 'wrap', isAddRoute = false }: BookCardListProps) {
  return (
    <ul className={`book-card-list ${sort}`}>
      {books.length > 0 &&
        books.map(({ isbn13, isbn, title, author, cover }: GettingBookType) => (
          <BookCard
            key={isbn}
            isbn={isbn13 || isbn}
            title={title}
            author={author}
            cover={cover}
            route={isAddRoute ? '/add' : ''}
          />
        ))}
    </ul>
  )
}

export default BookCardList
