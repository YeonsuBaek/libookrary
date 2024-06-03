'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import onModal from '../common/Modal'
import { deleteBook, getBookInfo } from '@/apis/book'
import onToast from '../common/Toast'
import PageTitle from '../common/PageTitle'
import ReadingInfo from './ReadingInfo'
import BookInfo from './BookInfo'
import { Button } from '@yeonsubaek/yeonsui'

interface BookPageProps {
  id: string
}

function BookPage({ id }: BookPageProps) {
  const { t } = useTranslation('')
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [cover, setCover] = useState('')
  const [author, setAuthor] = useState('')
  const [publisher, setPublisher] = useState('')
  const [pubdate, setPubdate] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(0)

  const handleOpenDeleteModal = () => {
    onModal({
      message: t('modal.book.delete'),
      onSave: onDelete,
    })
  }

  const onDelete = () => {
    deleteBook(
      { isbn: id },
      {
        onSuccess: () => {
          onToast({
            id: 'delete-success-toast',
            message: t('toast.book.delete.success'),
          })
          router.push('/')
        },
        onError: () => onToast({ id: 'delete-error-toast', message: t('toast.book.delete.error'), color: 'error' }),
      }
    )
  }

  useEffect(
    function fetchBookInfo() {
      ;(async () => {
        if (id) {
          const info = await getBookInfo({ isbn: id })
          setTitle(info?.title || '')
          setCover(info?.cover || '')
          setAuthor(info?.author || '')
          setPublisher(info?.publisher || '')
          setPubdate(info?.pubdate || '')
          setDesc(info?.desc || '')
          setCategory(info?.category || '')
          setPrice(info?.price || '')
        }
      })()
    },
    [id]
  )

  return (
    <>
      <PageTitle route={title} />
      <ReadingInfo id={id} title={title} cover={cover} />
      <BookInfo
        author={author}
        publisher={publisher}
        pubdate={pubdate}
        desc={desc}
        category={category}
        isbn={id}
        price={price}
      />
      <div className="book-buttons">
        <Button variant="link" color="success" onClick={() => router.push(`/book/edit/${id}`)}>
          {t('book.button.edit')}
        </Button>
        <Button variant="link" color="error" onClick={handleOpenDeleteModal}>
          {t('book.button.delete')}
        </Button>
      </div>
    </>
  )
}

export default BookPage
