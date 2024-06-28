'use client'
import React, { useEffect, useState } from 'react'
import PageTitle from '../common/PageTitle'
import ReadingEdit from './ReadingEdit'
import { BookmarkType } from '@/types/book'
import { getBookInfo, getUserBookDetailInfo } from '@/apis/book'

interface EditBookProps {
  id: string
}

function EditBook({ id }: EditBookProps) {
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
          setIsRecommended(info?.special?.isRecommended || false)
          setWantToReRead(info?.special?.wantToReRead || false)
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

export default EditBook
