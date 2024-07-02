'use client'
import { BookmarkType, MAX_BOOKMARK_CONTENT, SPECIAL_VALUES } from '@/types/book'
import { Button, Checkbox, DatePicker } from '@yeonsubaek/yeonsui'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { editBookToUser, getUserBookDetailInfo } from '@/apis/book'
import BookmarkEdit from './Bookmark/BookmarkEdit'
import BookmarkList from './Bookmark/BookmarkList'
import onToast from '../common/Toast'

interface ReadingEditProps {
  id: string
  title: string
  cover: string
}

function ReadingEdit({ id, title, cover }: ReadingEditProps) {
  const { t } = useTranslation('')
  const router = useRouter()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [page, setPage] = useState('')
  const [content, setContent] = useState('')
  const [isNotPage, setIsNotPage] = useState(false)
  const [isOverMaxContent, setIsOverMaxContent] = useState(false)
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
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : ''

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const newSelectedOptions = {
      ...selectedSpecial,
      [value]: !selectedSpecial[value],
    }
    setSelectedSpecial(newSelectedOptions)
  }

  const handleAddBookmark = () => {
    const invalidPage = isNaN(Number(page)) || page.trim() === ''
    const invalidContent = content.length > MAX_BOOKMARK_CONTENT
    if (invalidPage || invalidContent) {
      if (invalidPage) {
        setIsNotPage(true)
      }
      if (invalidContent) {
        setIsOverMaxContent(true)
      }
    } else {
      setBookmarks((prev) => [...prev, { id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 0, page, content }])
      setContent('')
      setPage('')

      if (isNotPage) {
        setIsNotPage(false)
      }
      if (isOverMaxContent) {
        setIsOverMaxContent(false)
      }
    }
  }

  const handleRemoveBookmark = (idToRemove: number) => {
    const newBookmarks = bookmarks.filter(({ id }: { id: number }) => id !== idToRemove)
    setBookmarks([...newBookmarks])
  }

  const handleEdit = () => {
    editBookToUser(
      {
        isbn: id,
        startDate,
        endDate,
        bookmarks,
        isRecommended: selectedSpecial[SPECIAL_VALUES.recommend],
        wantToReRead: selectedSpecial[SPECIAL_VALUES.reread],
      },
      {
        onSuccess: () => {
          onToast({ id: 'edit-success-toast', message: t('toast.book.edit.success') })
          router.push(`/book/${id}`)
        },
        onError: () => onToast({ id: 'edit-error-toast', message: t('toast.book.edit.error'), color: 'error' }),
      }
    )
  }

  useEffect(
    function fetchUserBookDetailInfo() {
      ;(async () => {
        if (userToken) {
          const info = await getUserBookDetailInfo({ isbn: id })
          setStartDate(info?.startDate || '')
          setEndDate(info?.endDate || '')
          setBookmarks(info?.bookmarks || [])
          setSelectedSpecial({
            wantToReRead: info?.special.wantToReRead || false,
            isRecommended: info?.special.isRecommended || false,
          })
        }
      })()
    },
    [userToken, id]
  )

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
              isNotPage={isNotPage}
              isOverMaxContent={isOverMaxContent}
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
          <Button variant="text" onClick={() => router.push(`/book/${id}`)}>
            {t('book.button.cancel')}
          </Button>
          <Button onClick={handleEdit}>{t('book.button.edit')}</Button>
        </div>
      </div>
    </div>
  )
}

export default ReadingEdit
