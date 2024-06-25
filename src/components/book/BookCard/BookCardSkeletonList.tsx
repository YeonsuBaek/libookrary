'use client'
import { useMemo } from 'react'
import BookCardSkeleton from './BookCardSkeleton'
import { useTranslation } from 'react-i18next'

interface BookCardListProps {
  sort?: 'wrap' | 'nowrap'
  count?: number
  width?: number
}

function BookCardSkeletonList({ sort = 'wrap', count = 4, width }: BookCardListProps) {
  const { t } = useTranslation('')
  const skeletonList = useMemo(() => {
    let list = []
    for (let i = 1; i <= count; i++) {
      list.push({ id: `book-card-skeleton-${i}`, title: t('book.skeleton.title'), info: t('book.skeleton.author') })
    }
    return list
  }, [count])
  return (
    <ul className={`book-card-list ${sort}`}>
      {skeletonList.map((skeleton) => (
        <BookCardSkeleton {...skeleton} key={skeleton.id} width={width} />
      ))}
    </ul>
  )
}

export default BookCardSkeletonList
