'use client'
import { DatePicker } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import BookmarkList from '../molecule/BookmarkList'
import { useEffect, useState } from 'react'
import { getUserBookDetailInfo } from '@/apis/book'

interface ReadingInfoProps {
  id: string
}

function ReadingInfo({ id }: ReadingInfoProps) {
  const { t } = useTranslation('')
  const userToken = localStorage.getItem('userToken')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookmarks, setBookmarks] = useState([])
  const [wantToReRead, setWantToReRead] = useState(false)
  const [isRecommended, setIsRecommended] = useState(false)

  useEffect(
    function fetchUserBookDetailInfo() {
      ;(async () => {
        if (userToken) {
          const info = await getUserBookDetailInfo({ isbn: id, userToken })
          setStartDate(info?.startDate || '')
          setEndDate(info?.end || [])
          setBookmarks(info?.bookmarks || '')
          setWantToReRead(info?.special.wantToReRead || [])
          setIsRecommended(info?.special.isRecommended || [])
        }
      })()
    },
    [userToken, id]
  )

  return (
    <div className="reading">
      <div className="reading-date">
        <div>
          <h3 className="reading-title">{t('book.reading.startDate')}</h3>
          <DatePicker startDate={startDate} disabled />
        </div>
        <div>
          <h3 className="reading-title">{t('book.reading.endDate')}</h3>
          <DatePicker endDate={endDate} disabled />
        </div>
      </div>
      <div className="reading-bookmark">
        <h3 className="reading-title">{t('book.reading.bookmark')}</h3>
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </div>
  )
}

export default ReadingInfo
