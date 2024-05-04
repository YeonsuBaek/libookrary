'use client'
import { useTranslation } from 'react-i18next'

const dummyBookInfo = {
  author: '조예은 (지은이)',
  publisher: '한겨레출판',
  publishDate: '2022-08-17',
  desc: '조예은 특유의 독특한 판타지성을 가미한 호러·스릴러풍의 직설적이고 유머러스하면서도 사랑스러운 괴담 여덟 편을 담았다. 부드럽고 말랑말랑하고 따뜻한, 총천연색 마음으로 쓰인 소설집 &lt;트로피컬 나이트&gt;는 소름이 돋을 만큼 무서운데도 사랑과 다정함이 충만하다.',
  category: '소설/시/희곡',
  isbn: '9791160408331',
  price: '15000',
}

function BookInfo() {
  const { t } = useTranslation('')
  return (
    <dl className="book-info">
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.author')}</dt>
        <dd className="book-info-detail">{dummyBookInfo.author}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.publisher')}</dt>
        <dd className="book-info-detail">{dummyBookInfo.publisher}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.publishDate')}</dt>
        <dd className="book-info-detail">{dummyBookInfo.publishDate}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.desc')}</dt>
        <dd className="book-info-detail">{dummyBookInfo.desc}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.category')}</dt>
        <dd className="book-info-detail">{dummyBookInfo.category}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.isbn')}</dt>
        <dd className="book-info-detail">{dummyBookInfo.isbn}</dd>
      </div>
      <div className="book-info-item">
        <dt className="book-info-title">{t('book.info.price')}</dt>
        <dd className="book-info-detail">{dummyBookInfo.price}</dd>
      </div>
    </dl>
  )
}

export default BookInfo
