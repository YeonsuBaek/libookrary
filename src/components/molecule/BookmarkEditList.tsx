import BookmarkEdit from '../atom/BookmarkEdit'

interface BookmarkType {
  id: number
  page: number
  text: string
}

interface BookmarkEditListProps {
  list: BookmarkType[]
}

function BookmarkEditList({ list }: BookmarkEditListProps) {
  return (
    <ul className="bookmark-list">
      {list.map(({ id, page, text }: BookmarkType) => {
        return <BookmarkEdit key={id} page={page} text={text} />
      })}
    </ul>
  )
}

export default BookmarkEditList
