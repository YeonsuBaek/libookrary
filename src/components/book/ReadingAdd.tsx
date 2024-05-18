'use client'
import { Button, Checkbox, DatePicker } from '@yeonsubaek/yeonsui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { addBookToUser, fetchAladinBookInfo, saveBookInfo, saveUserSavedBook } from '@/apis/book'
import BookmarkEdit from './Bookmark/BookmarkEdit'
import BookmarkList from './Bookmark/BookmarkList'
import { useSearchStore } from '@/stores/search'
import onToast from '../common/Toast'

interface ReadingAddProps {
  isbn: string
  title: string
  cover: string
}

function ReadingAdd({ isbn, title, cover }: ReadingAddProps) {
  const { t } = useTranslation('')
  const { isOpenSearch, setIsOpenSearch } = useSearchStore()
  const router = useRouter()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookmarks, setBookmarks] = useState('')
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
            isRecommended: selectedSpecial.includes(t('book.reading.recommend')),
            wantToReRead: selectedSpecial.includes(t('book.reading.reread')),
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

      onToast({ message: t('toast.book.save.success') })
      router.push('/')
      if (isOpenSearch) setIsOpenSearch(false)
    } catch (error) {
      onToast({ message: t('toast.book.login') })
      router.push('/login')
    }
  }

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
        <Button variant="text" onClick={() => router.push('/')}>
          {t('book.button.cancel')}
        </Button>
        <Button onClick={handleAddBook}>{t('book.button.add')}</Button>
      </div>
    </>
  )
}

export default ReadingAdd
