'use client'
import { useTranslation } from 'react-i18next'
import BookshelfList from './BookshelfList'
import { BookType, UserBookType } from '@/types/book'

interface BookshelfProps {
  nickname: string
  books: UserBookType[]
}

function Bookshelf({ nickname, books }: BookshelfProps) {
  const { t } = useTranslation('')

  const bookshelfTitle = t('home.title', { nickname })

  return (
    <>
      <h2 className="home-title">{bookshelfTitle}</h2>
      <BookshelfList books={books} />
    </>
  )
}

export default Bookshelf
