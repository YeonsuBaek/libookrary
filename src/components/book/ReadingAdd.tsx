'use client'
import { Button, Checkbox, DatePicker } from '@yeonsubaek/yeonsui'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { addBookToUser, fetchAladinBookInfo, saveBookInfo, saveUserSavedBook } from '@/apis/book'
import BookmarkEdit from './Bookmark/BookmarkEdit'
import BookmarkList from './Bookmark/BookmarkList'
import onToast from '../common/Toast'
import { BookmarkType, SPECIAL_VALUES } from '@/types/book'

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
            isRecommended: selectedSpecial[SPECIAL_VALUES.recommend],
            wantToReRead: selectedSpecial[SPECIAL_VALUES.reread],
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

      onToast({ id: 'add-book-success-toast', message: t('toast.book.save.success') })
      router.push('/')
    } catch (error) {
      onToast({ id: 'add-book-error-toast', message: t('toast.book.login') })
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
          <Button variant="text" onClick={() => router.push('/')}>
            {t('book.button.cancel')}
          </Button>
          <Button onClick={handleAddBook}>{t('book.button.add')}</Button>
        </div>
      </div>
    </div>
  )
}

export default ReadingAdd
