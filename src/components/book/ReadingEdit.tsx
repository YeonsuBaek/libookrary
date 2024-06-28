'use client'
import { BookmarkType, SPECIAL_VALUES } from '@/types/book'
import { Button, Checkbox, DatePicker } from '@yeonsubaek/yeonsui'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { editBookToUser } from '@/apis/book'
import BookmarkEdit from './Bookmark/BookmarkEdit'
import BookmarkList from './Bookmark/BookmarkList'
import onToast from '../common/Toast'

interface ReadingEditProps {
  isbn: string
  title: string
  cover: string
  defStartDate?: string
  defEndDate?: string
  defBookmarks?: BookmarkType[]
  defIsRecommended?: boolean
  defWantToReRead?: boolean
}

function ReadingEdit({
  isbn,
  title,
  cover,
  defStartDate = '',
  defEndDate = '',
  defBookmarks = [],
  defIsRecommended = false,
  defWantToReRead = false,
}: ReadingEditProps) {
  const { t } = useTranslation('')
  const router = useRouter()
  const [startDate, setStartDate] = useState(defStartDate)
  const [endDate, setEndDate] = useState(defEndDate)
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>(defBookmarks)
  const [page, setPage] = useState('')
  const [content, setContent] = useState('')
  const SPECIAL_OPTIONS = [
    { value: SPECIAL_VALUES.reread, text: t('book.reading.reread'), id: 'special1' },
    { value: SPECIAL_VALUES.recommend, text: t('book.reading.recommend'), id: 'special2' },
  ]
  const [selectedSpecial, setSelectedSpecial] = useState(
    SPECIAL_OPTIONS.reduce((acc, option) => {
      acc[option.value] = false
      return acc
    }, {} as { [key: string]: boolean })
  )

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newSelectedOptions = {
      ...selectedSpecial,
      [value]: !selectedSpecial[value],
    }
    setSelectedSpecial(newSelectedOptions)
  }

  const handleAddBookmark = () => {
    setBookmarks((prev) => [...prev, { id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0, page, content }])
  }

  const handleRemoveBookmark = (idToRemove: number) => {
    const newBookmarks = bookmarks.filter(({ id }: { id: number }) => id !== idToRemove)
    setBookmarks([...newBookmarks])
  }

  const handleEdit = () => {
    editBookToUser(
      {
        isbn,
        startDate,
        endDate,
        bookmarks,
        isRecommended: selectedSpecial[SPECIAL_VALUES.recommend],
        wantToReRead: selectedSpecial[SPECIAL_VALUES.reread],
      },
      {
        onSuccess: () => {
          onToast({ id: 'edit-success-toast', message: t('toast.book.edit.success') })
          router.push(`/book/${isbn}`)
        },
        onError: () => onToast({ id: 'edit-error-toast', message: t('toast.book.edit.error'), color: 'error' }),
      }
    )
  }

  useEffect(() => {
    setStartDate(defStartDate)
    setEndDate(defEndDate)
    setBookmarks(defBookmarks)

    let selected = { ...selectedSpecial }
    if (defIsRecommended) selected[SPECIAL_VALUES.recommend] = true
    if (defWantToReRead) selected[SPECIAL_VALUES.reread] = true
    setSelectedSpecial(selected)
  }, [defStartDate, defEndDate, defBookmarks, defIsRecommended, defWantToReRead])

  return (
    <div className="book-layout">
      <div className="book-image">
        <img src={cover} alt={title} />
      </div>
      <div className="book-layout-right">
        <div className="reading">
          <div className="reading-date">
            <div>
              <h3 className="reading-title">{t('book.reading.startDate')}</h3>
              <DatePicker
                id="reading-start-date-date-picker"
                value={startDate}
                setValue={(date: string) => setStartDate(date)}
              />
            </div>
            <div>
              <h3 className="reading-title">{t('book.reading.endDate')}</h3>
              <DatePicker
                id="reading-end-date-date-picker"
                value={endDate}
                setValue={(date: string) => setEndDate(date)}
              />
            </div>
          </div>
          <div className="reading-bookmark">
            <div className="reading-bookmark-edit">
              <h3 className="reading-title">{t('book.reading.bookmark')}</h3>
            </div>
            <BookmarkList bookmarks={bookmarks} onRemove={handleRemoveBookmark} />
            <BookmarkEdit
              onAdd={handleAddBookmark}
              page={page}
              setPage={setPage}
              content={content}
              setContent={setContent}
            />
          </div>
          <div className="reading-special">
            <h3 className="reading-title">{t('book.reading.special')}</h3>
            <Checkbox.Group
              options={SPECIAL_OPTIONS}
              checkedOptions={selectedSpecial}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelect(e)}
              wrap
            />
          </div>
        </div>
        <div className="book-buttons">
          <Button variant="text" onClick={() => router.push(`/book/${isbn}`)}>
            {t('book.button.cancel')}
          </Button>
          <Button onClick={handleEdit}>{t('book.button.edit')}</Button>
        </div>
      </div>
    </div>
  )
}

export default ReadingEdit
