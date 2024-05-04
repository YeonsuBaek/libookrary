import Bookmark from '../atom/Bookmark'

interface bookmarkType {
  id: number
  page: number
  text: string
}
const dummyBookmark: bookmarkType[] = [
  {
    id: 0,
    page: 10,
    text: 'blabla',
  },
  {
    id: 1,
    page: 12,
    text: 'blablablabla',
  },
]

function BookmarkList() {
  return (
    <ul className="bookmark-list">
      {dummyBookmark.map(({ id, page, text }: bookmarkType) => {
        return <Bookmark key={id} page={page} text={text} />
      })}
    </ul>
  )
}

export default BookmarkList
