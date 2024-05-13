'use client'
import { useFormStore } from '@/stores/form'
import { BookmarkType } from '@/types/book'
import { Button, Checkbox, DatePicker } from '@yeonsubaek/yeonsui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BookmarkEditList from '../molecule/BookmarkEditList'

interface ReadingEditProps {
  title: string
  cover: string
}

function ReadingEdit({ title, cover }: ReadingEditProps) {
  const { t } = useTranslation('')
  const { bookmarks, setBookmarks } = useFormStore()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  // const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])

  const SPECIAL_OPTIONS = [t('book.reading.reread'), t('book.reading.recommend')]
  const [selectedSpecial, setSelectedSpecial] = useState<string[]>([])

  const handleSelect = (option: string) => {
    if (selectedSpecial.includes(option)) {
      setSelectedSpecial((prev) => prev.filter((item) => item !== option))
    } else {
      setSelectedSpecial((prev) => [...prev, option])
    }
  }

  return (
    <>
      <div className='book-image'>
        <img src={cover} alt={title} />
      </div>
      <div className='reading'>
        <div className='reading-date'>
          <div>
            <h3 className='reading-title'>{t('book.reading.startDate')}</h3>
            <DatePicker value={startDate} setValue={(date: string) => setStartDate(date)} />
          </div>
          <div>
            <h3 className='reading-title'>{t('book.reading.endDate')}</h3>
            <DatePicker value={endDate} setValue={(date: string) => setEndDate(date)} />
          </div>
        </div>
        <div className='reading-bookmark'>
          <div className='reading-bookmark-edit'>
            <h3 className='reading-title'>{t('book.reading.bookmark')}</h3>
            <Button variant='link' onClick={() => setBookmarks({ page: 0, content: '' })}>
              {t('book.button.add')}
            </Button>
          </div>
          <BookmarkEditList list={bookmarks} />
        </div>
        <div className='reading-special'>
          <h3 className='reading-title'>{t('book.reading.special')}</h3>
          <Checkbox wrap options={SPECIAL_OPTIONS} selectedOptions={selectedSpecial} onSelect={handleSelect} />
        </div>
      </div>
    </>
  )
}

export default ReadingEdit
