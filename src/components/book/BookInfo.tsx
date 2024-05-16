'use client'
import { useTranslation } from 'react-i18next'

interface BookInfoProps {
  author: string
  publisher: string
  pubdate: string
  desc: string
  category: string
  isbn: string
  price: number
}

function BookInfo({ author, publisher, pubdate, desc, category, isbn, price }: BookInfoProps) {
  const { t } = useTranslation('')
  return (
    <dl className="book-info">
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.author')}</dt>
        <dd className="book-info-detail">{author}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.publisher')}</dt>
        <dd className="book-info-detail">{publisher}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.publishDate')}</dt>
        <dd className="book-info-detail">{pubdate}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.desc')}</dt>
        <dd className="book-info-detail">{desc}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.category')}</dt>
        <dd className="book-info-detail">{category}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.isbn')}</dt>
        <dd className="book-info-detail">{isbn}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.price')}</dt>
        <dd className="book-info-detail">{price}</dd>
      </div>
    </dl>
  )
}

export default BookInfo
