'use client'
import PageTitle from '@/components/atom/PageTitle'
import BookInfo from '@/components/molecule/BookInfo'
import ReadingInfo from '@/components/organism/ReadingInfo'
import { Button, RibbonBadge } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const wantToReRead = true
const isRecommended = true

function page() {
  const { t } = useTranslation('')
  const router = useRouter()

  return (
    <>
      <PageTitle>트로피컬 나이트</PageTitle>
      <div className="book-image">
        <img src="https://image.aladin.co.kr/product/29946/7/cover500/k962838741_1.jpg" alt="" />
        <div className="book-image-badge">
          {wantToReRead && <RibbonBadge value={t('book.reading.reread')} />}
          {isRecommended && <RibbonBadge value={t('book.reading.recommend')} />}
        </div>
      </div>
      <ReadingInfo />
      <BookInfo />
      <div className="book-buttons">
        <Button variant="link" color="success" onClick={() => router.push('/book/edit')}>
          {t('book.button.edit')}
        </Button>
        <Button variant="link" color="error">
          {t('book.button.delete')}
        </Button>
      </div>
    </>
  )
}

export default page
