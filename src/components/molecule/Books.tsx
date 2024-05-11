'use client'
import { useTranslation } from 'react-i18next'
import Book from '../atom/Book'
import { UserBookType } from '@/types/book'

interface BooksProps {
  books: string[]
}

function Books({ books }: BooksProps) {
  const { t } = useTranslation('')

  if (books.length === 0) {
    return <div className="books-blank">{t('home.blank')}</div>
  }

  return <ul className="books">{books && books.map((isbn) => <Book key={isbn} isbn={isbn} />)}</ul>
}

export default Books
