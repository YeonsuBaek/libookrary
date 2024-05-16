'use client'
import { useTranslation } from 'react-i18next'
import BookshelfItem from './BookshelfItem'

interface BookshelfListProps {
  books: string[]
}

function BookshelfList({ books }: BookshelfListProps) {
  const { t } = useTranslation('')

  if (books.length === 0) {
    return <div className="books-blank">{t('home.blank')}</div>
  }

  return <ul className="bookshelf-list">{books && books.map((isbn) => <BookshelfItem key={isbn} isbn={isbn} />)}</ul>
}

export default BookshelfList
