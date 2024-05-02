import BookList from './BookList'

interface RecommendedListProps {
  title: string
}

function RecommendedList({ title }: RecommendedListProps) {
  return (
    <div className="recommended-list">
      <h2 className="recommended-list-title">{title}</h2>
      <div className="recommended-list-books">
        <BookList sort="nowrap" />
      </div>
    </div>
  )
}

export default RecommendedList
