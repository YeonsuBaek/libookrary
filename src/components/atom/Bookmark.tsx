'use client'

import { Icon } from '@yeonsubaek/yeonsui'

interface BookmarkProps {
  page: number
  text: string
}

function Bookmark({ page, text }: BookmarkProps) {
  return (
    <li className="bookmark">
      <span className="bookmark-page">
        <Icon icon="Tag" size="xsmall" />
        {page}
      </span>
      <p className="bookmark-text">{text}</p>
    </li>
  )
}

export default Bookmark
