'use client'
import { useTranslation } from 'react-i18next'
import Book from '../atom/Book'

interface BookType {
  title: string
  page: number
  sizeHeight: number
  color: string
}

function Books({ dummyList = [] }: { dummyList?: any }) {
  const { t } = useTranslation('')

  if (dummyList.length === 0) {
    return <div className="books-blank">{t('home.blank')}</div>
  }

  return (
    <ul className="books">
      {dummyList &&
        dummyList.map(({ title, page, sizeHeight, color }: BookType) => (
          <Book title={title} page={page} key={title} height={sizeHeight} color={color} />
        ))}
    </ul>
  )
}

export default Books
