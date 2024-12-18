'use client'
import { DatePicker } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import BookmarkList from './Bookmark/BookmarkList'
import { useEffect, useState } from 'react'
import { getUserBookDetailInfo } from '@/apis/book'
import RibbonBadge from '../common/RibbonBadge'

interface ReadingInfoProps {
  id: string
  title: string
  cover: string
}

function ReadingInfo({ id, title, cover }: ReadingInfoProps) {
  const { t } = useTranslation('')
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : ''
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookmarks, setBookmarks] = useState([])
  const [wantToReRead, setWantToReRead] = useState(false)
  const [isRecommended, setIsRecommended] = useState(false)

  useEffect(
    function fetchUserBookDetailInfo() {
      ;(async () => {
        if (userToken) {
          const info = await getUserBookDetailInfo({ isbn: id })
          setStartDate(info?.startDate || '')
          setEndDate(info?.endDate || '')
          setBookmarks(info?.bookmarks || [])
          setWantToReRead(info?.special.wantToReRead || false)
          setIsRecommended(info?.special.isRecommended || false)
        }
      })()
    },
    [userToken, id]
  )

  return (
    <div className="book-layout">
      <div className="book-image">
        <img src={cover} alt={title} />
        <div className="book-image-badge">
          {wantToReRead && <RibbonBadge value={t('book.reading.reread')} />}
          {isRecommended && <RibbonBadge value={t('book.reading.recommend')} />}
        </div>
      </div>
      <div className="book-layout-right">
        <div className="reading">
          <div className="reading-date">
            <div>
              <h3 className="reading-title">{t('book.reading.startDate')}</h3>
              <DatePicker id="reading-start-date-date-picker" value={startDate} disabled />
            </div>
            <div>
              <h3 className="reading-title">{t('book.reading.endDate')}</h3>
              <DatePicker id="reading-end-date-date-picker" value={endDate} disabled />
            </div>
          </div>
          {bookmarks.length > 0 && (
            <div className="reading-bookmark">
              <h3 className="reading-title">{t('book.reading.bookmark')}</h3>
              <BookmarkList bookmarks={bookmarks} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReadingInfo
