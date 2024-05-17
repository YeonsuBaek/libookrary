'use client'
import { fetchAladinBookInfo } from '@/apis/book'
import PageTitle from '@/components/common/PageTitle'
import BookInfo from '@/components/book/BookInfo'
import { useEffect, useState } from 'react'
import ReadingAdd from '@/components/book/ReadingAdd'

function page({ params }: { params: { id: string } }) {
  const { id } = params
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [pubDate, setPubDate] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)

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

export default page
