import { BookmarkType } from '@/types/book'
import Bookmark from '../atom/Bookmark'

interface BookmarkListProps {
  bookmarks: BookmarkType[]
}

function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <ul className="bookmark-list">
      {bookmarks &&
        bookmarks.map(({ id, page, content }: BookmarkType) => {
          return <Bookmark key={id} page={page} text={content} />
        })}
    </ul>
  )
}

export default BookmarkList
