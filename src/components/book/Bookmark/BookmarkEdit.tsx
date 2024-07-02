'use client'
import { MAX_BOOKMARK_CONTENT } from '@/types/book'
import { Icon, IconButton, TextArea, TextField } from '@yeonsubaek/yeonsui'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface BookmarkEditProps {
  page: string
  content: string
  onAdd?: () => void
  setPage?: (val: string) => void
  setContent?: (val: string) => void
  isNotPage?: boolean
  isOverMaxContent?: boolean
}

function BookmarkEdit({
  onAdd = () => {},
  page,
  setPage = () => {},
  content,
  setContent = () => {},
  isNotPage = false,
  isOverMaxContent = false,
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
            isError={isNotPage}
            helperText={isNotPage ? t('helperText.bookmark.page') : ''}
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
        cols={3}
        maxText={MAX_BOOKMARK_CONTENT}
        isError={isOverMaxContent}
        helperText={isOverMaxContent ? t('helperText.bookmark.content', { number: MAX_BOOKMARK_CONTENT }) : ''}
      />
    </div>
  )
}

export default BookmarkEdit
