'use client'
import { BookType } from '@/types/book'
import BookCard from '../atom/BookCard'

interface BookListProps {
  books: any[]
  sort?: 'wrap' | 'nowrap'
}

function BookList({ books, sort = 'wrap' }: BookListProps) {
  return (
    <ul className={`book-list ${sort}`}>
      {books &&
        books.map(({ isbn13: isbn, title, author, cover }: BookType) => (
          <BookCard key={isbn} isbn={isbn} title={title} author={author} cover={cover} />
        ))}
    </ul>
  )
}

export default BookList
