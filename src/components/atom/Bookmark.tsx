'use client'

import { Icon, IconButton } from '@yeonsubaek/yeonsui'

interface BookmarkProps {
  page: string
  text: string
  onRemove?: (id: number) => void
}

function Bookmark({ page, text, onRemove = () => {} }: BookmarkProps) {
  return (
    <li className="bookmark">
      <div className="bookmark-header">
        <div className="bookmark-page">
          <Icon icon="Tag" size="xsmall" />
          {page}
        </div>
        <IconButton icon="MinusCircle" color="error" onClick={onRemove} />
      </div>
      <p className="bookmark-text">{text}</p>
    </li>
  )
}

export default Bookmark
