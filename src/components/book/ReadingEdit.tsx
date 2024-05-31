'use client'
import { BookmarkType } from '@/types/book'
import { Button, Checkbox, DatePicker } from '@yeonsubaek/yeonsui'
import { useEffect, useState } from 'react'
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
  const SPECIAL_OPTIONS = [t('book.reading.reread'), t('book.reading.recommend')]
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>([])

  const handleSelect = (option: string) => {
    if (selectedSpecial.includes(option)) {
      setSelectedSpecial((prev) => prev.filter((item) => item !== option))
    } else {
      setSelectedSpecial((prev) => [...prev, option])
    }
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
        isRecommended: selectedSpecial.includes(t('book.reading.recommend')),
        wantToReRead: selectedSpecial.includes(t('book.reading.reread')),
      },
      {
        onSuccess: () => {
          onToast({ message: t('toast.book.edit.success') })
          router.push(`/book/${isbn}`)
        },
        onError: () => onToast({ message: t('toast.book.edit.error'), color: 'error' }),
      }
    )
  }

  useEffect(() => {
    setStartDate(defStartDate)
    setEndDate(defEndDate)
    setBookmarks(defBookmarks)

    const selected: string[] = []
    if (defIsRecommended) selected.push(t('book.reading.recommend'))
    if (defWantToReRead) selected.push(t('book.reading.reread'))
    setSelectedSpecial(selected)
  }, [defStartDate, defEndDate, defBookmarks, defIsRecommended, defWantToReRead])

  return (
    <>
      <div className="book-image">
        <img src={cover} alt={title} />
      </div>
      <div className="reading">
        <div className="reading-date">
          <div>
            <h3 className="reading-title">{t('book.reading.startDate')}</h3>
            <DatePicker value={startDate} setValue={(date: string) => setStartDate(date)} />
          </div>
          <div>
            <h3 className="reading-title">{t('book.reading.endDate')}</h3>
            <DatePicker value={endDate} setValue={(date: string) => setEndDate(date)} />
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
          <Checkbox wrap options={SPECIAL_OPTIONS} selectedOptions={selectedSpecial} onSelect={handleSelect} />
        </div>
      </div>
      <div className="book-buttons">
        <Button variant="text" onClick={() => router.push(`/book/${isbn}`)}>
          {t('book.button.cancel')}
        </Button>
        <Button onClick={handleEdit}>{t('book.button.edit')}</Button>
      </div>
    </>
  )
}

export default ReadingEdit
