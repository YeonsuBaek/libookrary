'use client'
import { MAX_BOOKMARK_CONTENT } from '@/types/book'
import { Button, PlusIcon, TagIcon, TextArea, TextField } from '@yeonsubaek/yeonsui'
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
          <TagIcon size={20} />
          <TextField
            id="bookmark-page"
            value={page}
            onChange={setPage}
            size="small"
            placeholder={t('book.placeholder.bookmark.page')}
            isError={isNotPage}
            helperText={isNotPage ? t('helperText.bookmark.page') : ''}
          />
        </div>
        <div className="bookmark-buttons">
          <Button styleType="icon" styleVariant="primary" size="small">
            <PlusIcon />
          </Button>
        </div>
      </div>
      <TextArea
        id="bookmark-content"
        value={content}
        onChange={setContent}
        placeholder={t('book.placeholder.bookmark.content')}
        rows={3}
        maxLength={MAX_BOOKMARK_CONTENT}
        error={isOverMaxContent}
        helperText={isOverMaxContent ? t('helperText.bookmark.content', { number: MAX_BOOKMARK_CONTENT }) : ''}
      />
    </div>
  )
}

export default BookmarkEdit
