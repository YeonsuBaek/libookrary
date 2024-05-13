'use client'
import { BookType } from '@/types/book'
import BookCard from '../atom/BookCard'

interface BookCardListProps {
  books: any[]
  sort?: 'wrap' | 'nowrap'
}

function BookCardList({ books, sort = 'wrap' }: BookCardListProps) {
  return (
    <ul className={`book-list ${sort}`}>
      {books &&
        books.map(({ isbn13: isbn, title, author, cover }: BookType) => (
          <BookCard key={isbn} isbn={isbn} title={title} author={author} cover={cover} />
        ))}
    </ul>
  )
}

export default BookCardList
