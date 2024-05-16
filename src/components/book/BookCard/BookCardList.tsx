'use client'
import { BookType, UserBookType } from '@/types/book'
import BookCard from './BookCard'

interface BookCardListProps {
  books: UserBookType[]
  sort?: 'wrap' | 'nowrap'
}

function BookCardList({ books, sort = 'wrap' }: BookCardListProps) {
  return (
    <ul className={`book-card-list ${sort}`}>
      {books &&
        books.map(({ isbn, title, author, cover }) => (
          <BookCard key={isbn} isbn={isbn} title={title} author={author} cover={cover} />
        ))}
    </ul>
  )
}

export default BookCardList
