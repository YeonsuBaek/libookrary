'use client'
import { useTranslation } from 'react-i18next'
import BookshelfList from './BookshelfList'

interface BookshelfProps {
  nickname: string
  books: string[]
}

function Bookshelf({ nickname, books }: BookshelfProps) {
  const { t } = useTranslation('')
  const userToken = localStorage.getItem('userToken')

  const bookshelfTitle = Boolean(userToken) ? t('home.title', { nickname }) : '로그인 후 이용해주세요.'

  return (
    <>
      <h2 className="home-title">{bookshelfTitle}</h2>
      {Boolean(userToken) && <BookshelfList books={books} />}
    </>
  )
}

export default Bookshelf
