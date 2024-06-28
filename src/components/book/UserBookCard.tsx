'use client'
import { UserBookType } from '@/types/book'
import BookCardList from './BookCard/BookCardList'
import { useTranslation } from 'react-i18next'

interface UserBookCardProps {
  books: UserBookType[]
}

function UserBookCard({ books }: UserBookCardProps) {
  const { t } = useTranslation('')

  return (
    <div className="user-book-card">
      {books.length > 0 ? (
        <BookCardList books={books} width={150} />
      ) : (
        <p className="user-book-card-blank">{t('book.message.blank')}</p>
      )}
    </div>
  )
}

export default UserBookCard
