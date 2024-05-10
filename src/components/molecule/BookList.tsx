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
        books.map(({ title, author, cover }: BookType) => (
          <BookCard key={title} title={title} author={author} cover={cover} />
        ))}
    </ul>
  )
}

export default BookList
