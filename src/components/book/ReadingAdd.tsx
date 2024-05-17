'use client'
import { Button, Checkbox, DatePicker } from '@yeonsubaek/yeonsui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { addBookToUser, fetchAladinBookInfo, saveBookInfo, saveUserSavedBook } from '@/apis/book'
import BookmarkEdit from './Bookmark/BookmarkEdit'
import BookmarkList from './Bookmark/BookmarkList'

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
    console.log(idToRemove)
    const newBookmarks = bookmarks.filter(({ id }: { id: number }) => id !== idToRemove)
    setBookmarks([...newBookmarks])
  }

  const handleAddBook = async () => {
    await fetchAladinBookInfo(
      { isbn },
      {
        onSuccess: async (res) => {
          await saveBookInfo(res[0], { onSuccess: () => {}, onError: console.error })
          await addBookToUser(
            {
              isbn: res[0].isbn13,
              title: res[0].title,
              depth: res[0].subInfo.packing.sizeDepth,
              height: res[0].subInfo.packing.sizeHeight,
              author: res[0].author,
              cover: res[0].cover,
            },
            {
              onSuccess: () => {},
              onError: console.error,
            }
          )
          await saveUserSavedBook(
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
              onError: console.error,
            }
          )
          alert('성공적으로 저장하였습니다.')
          router.push('/')
        },
        onError: console.error,
      }
    )
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
