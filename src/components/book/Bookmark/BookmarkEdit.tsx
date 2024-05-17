'use client'
import { Icon, IconButton, TextArea, TextField } from '@yeonsubaek/yeonsui'
import { ChangeEvent, useState } from 'react'

interface BookmarkEditProps {
  onAdd: () => void
  page: string
  setPage: (val: string) => void
  content: string
  setContent: (val: string) => void
}

function BookmarkEdit({ onAdd, page, setPage, content, setContent }: BookmarkEditProps) {
  return (
    <div className="bookmark">
      <div className="bookmark-header">
        <div className="bookmark-page">
          <Icon icon="Tag" size="xsmall" />
          <TextField
            value={page}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPage(e.target.value)}
            size="small"
          />
        </div>
        <div className="bookmark-buttons">
          <IconButton icon="PlusCircle" color="success" onClick={onAdd} />
        </div>
      </div>
      <TextArea value={content} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} />
    </div>
  )
}

export default BookmarkEdit
