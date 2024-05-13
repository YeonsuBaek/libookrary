import { BookmarkType } from '@/types/book'
import BookmarkEdit from '../atom/BookmarkEdit'

interface BookmarkEditListProps {
  list: BookmarkType[]
}

function BookmarkEditList({ list }: BookmarkEditListProps) {
  return (
    <ul className="bookmark-list">
      {list.length > 0 &&
        list.map(({ id, page, content }: BookmarkType) => {
          return <BookmarkEdit key={id} page={page} text={content} />
        })}
    </ul>
  )
}

export default BookmarkEditList
