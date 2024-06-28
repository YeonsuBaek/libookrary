import BookCardList from './BookCard/BookCardList'
import BookCardSkeletonList from './BookCard/BookCardSkeletonList'

interface RecommendedListProps {
  title: string
  books: any[]
}

function RecommendedList({ title, books }: RecommendedListProps) {
  return (
    <div className="recommended-list">
      <h2 className="recommended-list-title">{title}</h2>
      <div className="recommended-list-books">
        {books.length > 0 ? (
          <BookCardList sort="nowrap" books={books} isAddRoute width={150} />
        ) : (
          <BookCardSkeletonList sort="nowrap" count={10} width={150} />
        )}
      </div>
    </div>
  )
}

export default RecommendedList
