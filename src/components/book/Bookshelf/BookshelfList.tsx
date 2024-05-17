'use client'
import { useTranslation } from 'react-i18next'
import BookshelfItem from './BookshelfItem'
import { UserBookType } from '@/types/book'

interface BookshelfListProps {
  books: UserBookType[]
}

function BookshelfList({ books }: BookshelfListProps) {
  const { t } = useTranslation('')

  if (books.length === 0) {
    return <div className="bookshelf-list-blank">{t('home.blank')}</div>
  }

  return (
    <ul className="bookshelf-list">
      {books &&
        books.map(({ isbn, title, depth, height, color }) => (
          <BookshelfItem key={isbn} isbn={isbn} title={title} depth={depth} height={height} color={color} />
        ))}
    </ul>
  )
}

export default BookshelfList
