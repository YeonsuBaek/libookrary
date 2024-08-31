'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import onModal from '../common/Modal'
import { deleteBook } from '@/apis/book'
import onToast from '../common/Toast'
import { Button } from '@yeonsubaek/yeonsui'

interface BookPageProps {
  id: string
}

function BookPageButtons({ id }: BookPageProps) {
  const { t } = useTranslation('')
  const router = useRouter()

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

  return (
    <div className="book-buttons">
      <Button styleType="ghost" styleVariant="primary" onClick={() => router.push(`/book/edit/${id}`)}>
        {t('book.button.edit')}
      </Button>
      <Button styleType="ghost" styleVariant="secondary" color="error" onClick={handleOpenDeleteModal}>
        {t('book.button.delete')}
      </Button>
    </div>
  )
}

export default BookPageButtons
