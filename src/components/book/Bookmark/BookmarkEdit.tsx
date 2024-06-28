'use client'
import { Icon, IconButton, TextArea, TextField } from '@yeonsubaek/yeonsui'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface BookmarkEditProps {
  page: string
  content: string
  onAdd?: () => void
  setPage?: (val: string) => void
  setContent?: (val: string) => void
}

function BookmarkEdit({
  onAdd = () => {},
  page,
  setPage = () => {},
  content,
  setContent = () => {},
}: BookmarkEditProps) {
  const { t } = useTranslation('')

  return (
    <div className="bookmark">
      <div className="bookmark-header">
        <div className="bookmark-page">
          <Icon icon="Tag" size="xsmall" />
          <TextField
            id="bookmark-page"
            value={page}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPage(e.target.value)}
            size="small"
            placeholder={t('book.placeholder.bookmark.page')}
          />
        </div>
        <div className="bookmark-buttons">
          <IconButton icon="PlusCircle" color="success" onClick={onAdd} />
        </div>
      </div>
      <TextArea
        id="bookmark-content"
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        placeholder={t('book.placeholder.bookmark.content')}
      />
    </div>
  )
}

export default BookmarkEdit
