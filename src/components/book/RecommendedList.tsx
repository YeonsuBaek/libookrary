import { useTranslation } from 'react-i18next'
import BookCardList from './BookCard/BookCardList'
import BookCardSkeleton from './BookCard/BookCardSkeleton'

interface RecommendedListProps {
  title: string
  books: any[]
}

function RecommendedList({ title, books }: RecommendedListProps) {
  const { t } = useTranslation('')
  const skeletonList = [
    { id: 'book-card-skeleton-1', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
    { id: 'book-card-skeleton-2', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
    { id: 'book-card-skeleton-3', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
    { id: 'book-card-skeleton-4', title: t('book.skeleton.title'), info: t('book.skeleton.author') },
  ]
  return (
    <div className="recommended-list">
      <h2 className="recommended-list-title">{title}</h2>
      <div className="recommended-list-books">
        {books.length > 0 ? (
          <BookCardList sort="nowrap" books={books} isAddRoute />
        ) : (
          skeletonList.map((skeleton) => <BookCardSkeleton {...skeleton} />)
        )}
      </div>
    </div>
  )
}

export default RecommendedList
