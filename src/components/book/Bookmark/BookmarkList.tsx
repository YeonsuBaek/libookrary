import { BookmarkType } from '@/types/book'
import Bookmark from './Bookmark'

interface BookmarkListProps {
  bookmarks: BookmarkType[]
  onRemove?: (id: number) => void
}

function BookmarkList({ bookmarks, onRemove }: BookmarkListProps) {
  return (
    <ul className="bookmark-list">
      {bookmarks &&
        bookmarks.map(({ id, page, content }: BookmarkType) => {
          return <Bookmark key={id} page={page} text={content} onRemove={onRemove ? () => onRemove(id) : undefined} />
        })}
    </ul>
  )
}

export default BookmarkList
