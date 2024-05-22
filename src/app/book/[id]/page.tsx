'use client'
import { deleteBook, getBookInfo } from '@/apis/book'
import PageTitle from '@/components/common/PageTitle'
import BookInfo from '@/components/book/BookInfo'
import ReadingInfo from '@/components/book/ReadingInfo'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import onToast from '@/components/common/Toast'
import onModal from '@/components/common/Modal'

function page({ params }: { params: { id: string } }) {
  const { id } = params
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
            message: t('toast.book.delete.success'),
          })
          router.push('/')
        },
        onError: () => onToast({ message: t('toast.book.delete.error'), color: 'error' }),
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

export default page
