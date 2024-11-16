'use client'
import { Button, Checkbox, CheckboxGroup, DatePicker } from '@yeonsubaek/yeonsui'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { addBookToUser, fetchAladinBookInfo, saveBookInfo, saveUserSavedBook } from '@/apis/book'
import BookmarkEdit from './Bookmark/BookmarkEdit'
import BookmarkList from './Bookmark/BookmarkList'
import onToast from '../common/Toast'
import { BookmarkType, MAX_BOOKMARK_CONTENT, SPECIAL_VALUES } from '@/types/book'

interface ReadingAddProps {
  isbn: string
  title: string
  cover: string
}

function ReadingAdd({ isbn, title, cover }: ReadingAddProps) {
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
    { value: SPECIAL_VALUES.reread, label: t('book.reading.reread'), id: 'special1' },
    { value: SPECIAL_VALUES.recommend, label: t('book.reading.recommend'), id: 'special2' },
  ]
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>([])

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

  const handleAddBook = async () => {
    const bookInfo = await fetchAladinBookInfo({ isbn })
    try {
      await Promise.all([
        addBookToUser(
          {
            isbn: bookInfo.isbn13,
            title: bookInfo.title,
            depth: bookInfo.subInfo.packing.sizeDepth,
            height: bookInfo.subInfo.packing.sizeHeight,
            author: bookInfo.author,
            cover: bookInfo.cover,
          },
          {
            onSuccess: () => {},
            onError: (error) => {
              throw new Error(error)
            },
          }
        ),
        saveUserSavedBook(
          {
            isbn,
            startDate,
            endDate,
            bookmarks,
            isRecommended: selectedSpecial.includes(SPECIAL_VALUES.recommend),
            wantToReRead: selectedSpecial.includes(SPECIAL_VALUES.reread),
          },
          {
            onSuccess: () => {},
            onError: (error) => {
              throw new Error(error)
            },
          }
        ),
        saveBookInfo(bookInfo, {
          onSuccess: () => {},
          onError: (error) => {
            throw new Error(error)
          },
        }),
      ])

      onToast({ id: 'add-book-success-toast', message: t('toast.book.save.success'), state: 'success' })
      router.push('/')
    } catch (error) {
      onToast({ id: 'add-book-error-toast', message: t('toast.book.login'), state: 'error' })
      router.push('/login')
    }
  }

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
                onChange={(date: string) => setStartDate(date)}
              />
            </div>
            <div>
              <h3 className="reading-title">{t('book.reading.endDate')}</h3>
              <DatePicker
                id="reading-end-date-date-picker"
                value={endDate}
                onChange={(date: string) => setEndDate(date)}
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
            <CheckboxGroup
              options={SPECIAL_OPTIONS}
              name="special"
              checkedOptions={selectedSpecial}
              onChange={setSelectedSpecial}
            />
          </div>
        </div>
        <div className="book-buttons">
          <Button styleType="ghost" styleVariant="secondary" onClick={() => router.push('/')}>
            {t('book.button.cancel')}
          </Button>
          <Button styleType="ghost" styleVariant="primary" onClick={handleAddBook}>
            {t('book.button.add')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReadingAdd
