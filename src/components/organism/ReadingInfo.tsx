'use client'
import { DatePicker } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import BookmarkList from '../molecule/BookmarkList'

function ReadingInfo() {
  const { t } = useTranslation('')

  return (
    <div className="reading">
      <div className="reading-date">
        <div>
          <h3 className="reading-title">{t('book.reading.startDate')}</h3>
          <DatePicker disabled />
        </div>
        <div>
          <h3 className="reading-title">{t('book.reading.endDate')}</h3>
          <DatePicker disabled />
        </div>
      </div>
      <div className="reading-bookmark">
        <h3 className="reading-title">{t('book.reading.bookmark')}</h3>
        <BookmarkList />
      </div>
    </div>
  )
}

export default ReadingInfo
