import { getBookInfo } from '@/apis/book'
import ReadingEdit from '@/components/book/ReadingEdit'
import PageTitle from '@/components/common/PageTitle'
import Skeleton from '@/components/common/Skeleton'
import { Suspense } from 'react'

async function page({ params }: { params: { id: string } }) {
  const { id } = params
  const info = await getBookInfo({ isbn: id })

  return (
    <Suspense fallback={<Skeleton />}>
      <PageTitle route={info?.title} />
      <ReadingEdit
        isbn={id}
        title={info?.title}
        cover={info?.cover}
        defStartDate={info?.startDate}
        defEndDate={info?.endDate}
        defBookmarks={info?.bookmarks}
        defIsRecommended={info?.isRecommended}
        defWantToReRead={info?.wantToReRead}
      />
    </Suspense>
  )
}

export default page
