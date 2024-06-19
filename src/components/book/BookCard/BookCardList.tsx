'use client'
import { UserBookType } from '@/types/book'
import BookCard from './BookCard'
import BookCardSkeleton from './BookCardSkeleton'
import { useTranslation } from 'react-i18next'

interface BookCardListProps {
  books: UserBookType[]
  sort?: 'wrap' | 'nowrap'
  isAddRoute?: boolean
}

interface GettingBookType extends UserBookType {
  isbn13?: string
}

function BookCardList({ books, sort = 'wrap', isAddRoute = false }: BookCardListProps) {
  const { t } = useTranslation('')

  const skeletonList = [
    { id: 'book-card-skeleton-1', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
    { id: 'book-card-skeleton-2', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
    { id: 'book-card-skeleton-3', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
    { id: 'book-card-skeleton-4', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
  ]
  return (
    <ul className={`book-card-list ${sort}`}>
      {books.length > 0
        ? books.map(({ isbn13, isbn, title, author, cover }: GettingBookType) => (
            <BookCard
              key={isbn}
              isbn={isbn13 || isbn}
              title={title}
              author={author}
              cover={cover}
              route={isAddRoute ? '/add' : ''}
            />
          ))
        : skeletonList.map((skeleton) => <BookCardSkeleton {...skeleton} />)}
    </ul>
  )
}

export default BookCardList
