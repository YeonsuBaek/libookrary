import { UserBookType } from '@/types/book'
import BookCardList from './BookCard/BookCardList'

interface UserBookCardProps {
  books: UserBookType[]
}

function UserBookCard({ books }: UserBookCardProps) {
  return (
    <div className="user-book-card">
      {books.length > 0 ? (
        <BookCardList books={books} />
      ) : (
        <p className="user-book-card-blank">저장된 도서가 없습니다.</p>
      )}
    </div>
  )
}

export default UserBookCard
