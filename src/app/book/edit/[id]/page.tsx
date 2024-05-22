'use client'
import PageTitle from '@/components/common/PageTitle'
import ReadingEdit from '@/components/book/ReadingEdit'
import { useEffect, useState } from 'react'
import { getBookInfo, getUserBookDetailInfo } from '@/apis/book'
import { BookmarkType } from '@/types/book'

function page({ params }: { params: { id: string } }) {
  const { id } = params
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [isRecommended, setIsRecommended] = useState(false)
  const [wantToReRead, setWantToReRead] = useState(false)

  useEffect(
    function fetchBookInfo() {
      ;(async () => {
        if (id) {
          const bookInfo = await getBookInfo({ isbn: id })
          const info = await getUserBookDetailInfo({ isbn: id })
          setTitle(bookInfo?.title || '')
          setCover(bookInfo?.cover || '')
          setStartDate(info?.startDate || '')
          setEndDate(info?.endDate || '')
          setBookmarks(info?.bookmarks || [])
          setIsRecommended(info?.special?.isRecommended || [])
          setWantToReRead(info?.special?.wantToReRead || [])
        }
      })()
    },
    [id]
  )

  return (
    <>
      <PageTitle route={title} />
      <ReadingEdit
        isbn={id}
        title={title}
        cover={cover}
        defStartDate={startDate}
        defEndDate={endDate}
        defBookmarks={bookmarks}
        defIsRecommended={isRecommended}
        defWantToReRead={wantToReRead}
      />
    </>
  )
}

export default page
