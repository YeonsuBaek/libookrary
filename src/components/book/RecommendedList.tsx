import BookCardList from './BookCard/BookCardList'

interface RecommendedListProps {
  title: string
  books: any[]
}

function RecommendedList({ title, books }: RecommendedListProps) {
  return (
    <div className="recommended-list">
      <h2 className="recommended-list-title">{title}</h2>
      <div className="recommended-list-books">
        <BookCardList sort="nowrap" books={books} />
      </div>
    </div>
  )
}

export default RecommendedList
