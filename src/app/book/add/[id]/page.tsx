'use client'
import { fetchAladinBookInfo } from '@/apis/book'
import PageTitle from '@/components/atom/PageTitle'
import BookInfo from '@/components/molecule/BookInfo'
import ReadingEdit from '@/components/organism/ReadingEdit'
import { useEffect, useState } from 'react'

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
          await fetchAladinBookInfo(
            { isbn: id },
            {
              onSuccess: (info) => {
                setTitle(info[0]?.title || '')
                setCover(info[0]?.cover || '')
                setAuthor(info[0]?.author || '')
                setPublisher(info[0]?.publisher || '')
                setPubDate(info[0]?.pubDate || '')
                setDesc(info[0]?.description || '')
                setCategory(info[0]?.categoryName || '')
                setPrice(info[0]?.priceStandard || 0)
              },
              onError: console.error,
            }
          )
        }
      })()
    },
    [id]
  )

  return (
    <>
      <PageTitle route={title} />
      <ReadingEdit isbn={id} title={title} cover={cover} />
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
