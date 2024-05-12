'use client'
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
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      page: 10,
      text: 'blabla',
    },
  ])
  const SPECIAL_OPTIONS = [t('book.reading.reread'), t('book.reading.recommend')]

  return (
    <>
      <div className="book-image">
        <img src={cover} alt={title} />
      </div>
      <div className="reading">
        <div className="reading-date">
          <div>
            <h3 className="reading-title">{t('book.reading.startDate')}</h3>
            <DatePicker />
          </div>
          <div>
            <h3 className="reading-title">{t('book.reading.endDate')}</h3>
            <DatePicker />
          </div>
        </div>
        <div className="reading-bookmark">
          <div className="reading-bookmark-edit">
            <h3 className="reading-title">{t('book.reading.bookmark')}</h3>
            <Button
              variant="link"
              onClick={() => setBookmarks((prev) => [...prev, { id: prev[prev.length - 1].id + 1, page: 0, text: '' }])}
            >
              {t('book.button.add')}
            </Button>
          </div>
          <BookmarkEditList list={bookmarks} />
        </div>
        <div className="reading-special">
          <h3 className="reading-title">{t('book.reading.special')}</h3>
          <Checkbox wrap options={SPECIAL_OPTIONS} selectedOptions={[]} onSelect={() => {}} />
        </div>
      </div>
    </>
  )
}

export default ReadingEdit
