'use client'
import PageTitle from '@/components/atom/PageTitle'
import ReadingEdit from '@/components/organism/ReadingEdit'
import { Button } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function page() {
  const { t } = useTranslation('')
  const router = useRouter()

  return (
    <>
      <PageTitle>트로피컬 나이트</PageTitle>
      <div className="book-image">
        <img src="https://image.aladin.co.kr/product/29946/7/cover500/k962838741_1.jpg" alt="" />
      </div>
      <ReadingEdit />
      <div className="book-buttons">
        <Button variant="text" onClick={() => router.push('/book')}>
          {t('book.button.cancel')}
        </Button>
        <Button>{t('book.button.edit')}</Button>
      </div>
    </>
  )
}

export default page
