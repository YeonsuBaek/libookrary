'use client'

import { TagIcon } from '@yeonsubaek/yeonsui'

interface BookmarkProps {
  page: string
  text: string
  onRemove?: () => void
}

function Bookmark({ page, text, onRemove }: BookmarkProps) {
  return (
    <li className="bookmark">
      <div className="bookmark-header">
        <div className="bookmark-page">
          <TagIcon />
          {page}
        </div>
        {/* {onRemove && <IconButton icon="MinusCircle" color="error" onClick={onRemove} />} */}
      </div>
      <p className="bookmark-text">{text}</p>
    </li>
  )
}

export default Bookmark
