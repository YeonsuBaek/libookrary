'use client'
import { DatePicker, RibbonBadge } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import BookmarkList from './Bookmark/BookmarkList'
import { useEffect, useState } from 'react'
import { getUserBookDetailInfo } from '@/apis/book'

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
    <>
      <div className="book-image">
        <img src={cover} alt={title} />
        <div className="book-image-badge">
          {wantToReRead && <RibbonBadge value={t('book.reading.reread')} />}
          {isRecommended && <RibbonBadge value={t('book.reading.recommend')} />}
        </div>
      </div>
      <div className="reading">
        <div className="reading-date">
          <div>
            <h3 className="reading-title">{t('book.reading.startDate')}</h3>
            <DatePicker value={startDate} disabled />
          </div>
          <div>
            <h3 className="reading-title">{t('book.reading.endDate')}</h3>
            <DatePicker value={endDate} disabled />
          </div>
        </div>
        {bookmarks.length > 0 && (
          <div className="reading-bookmark">
            <h3 className="reading-title">{t('book.reading.bookmark')}</h3>
            <BookmarkList bookmarks={bookmarks} />
          </div>
        )}
      </div>
    </>
  )
}

export default ReadingInfo
