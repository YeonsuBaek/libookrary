'use client'
import React, { useEffect, useState } from 'react'
import PageTitle from '../common/PageTitle'
import ReadingAdd from './ReadingAdd'
import BookInfo from './BookInfo'
import { fetchAladinBookInfo } from '@/apis/book'
import { useRouter } from 'next/navigation'

interface AddBookProps {
  id: string
}

function AddBook({ id }: AddBookProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [pubDate, setPubDate] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)

  const handlePopState = () => {
    const backUrl = new URL(window.location.href)
    if (!backUrl.hash.includes(id)) {
      backUrl.hash = id
      router.replace(backUrl.toString(), { shallow: true })
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(
    function fetchBookInfo() {
      ;(async () => {
        if (id) {
          const bookInfo = await fetchAladinBookInfo({ isbn: id })

          setTitle(bookInfo?.title || '')
          setCover(bookInfo?.cover || '')
          setAuthor(bookInfo?.author || '')
          setPublisher(bookInfo?.publisher || '')
          setPubDate(bookInfo?.pubDate || '')
          setDesc(bookInfo?.description || '')
          setCategory(bookInfo?.categoryName || '')
          setPrice(bookInfo?.priceStandard || 0)
        }
      })()
    },
    [id]
  )

  return (
    <>
      <PageTitle route={title} />
      <ReadingAdd isbn={id} title={title} cover={cover} />
      <BookInfo
        author={author}
        publisher={publisher}
        pubdate={pubDate}
        desc={desc}
        category={category}
        isbn={id}
        price={price}
      />
    </>
  )
}

export default AddBook
