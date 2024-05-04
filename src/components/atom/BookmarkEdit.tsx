'use client'
import { Icon, TextArea, TextField } from '@yeonsubaek/yeonsui'

interface BookmarkEditProps {
  page: number
  text: string
}

function BookmarkEdit({ page, text }: BookmarkEditProps) {
  return (
    <li className="bookmark">
      <span className="bookmark-page">
        <Icon icon="Tag" size="xsmall" />
        <TextField value={page} onChange={() => {}} size="small" />
      </span>
      <TextArea value={text} onChange={() => {}} />
    </li>
  )
}

export default BookmarkEdit
