import { getBookInfo } from '@/apis/book'
import BookInfo from '@/components/book/BookInfo'
import BookPageButtons from '@/components/book/BookPageButtons'
import ReadingInfo from '@/components/book/ReadingInfo'
import PageTitle from '@/components/common/PageTitle'
import { Suspense } from 'react'
import Skeleton from '@/components/common/Skeleton'

async function page({ params }: { params: { id: string } }) {
  const { id } = params
  const info = await getBookInfo({ isbn: id })

  return (
    <Suspense fallback={<Skeleton />}>
      <PageTitle route={info?.title} />
      <ReadingInfo id={id} title={info?.title} cover={info?.cover} />
      <BookInfo
        author={info?.author}
        publisher={info?.publisher}
        pubdate={info?.pubdate}
        desc={info?.desc}
        category={info?.category}
        isbn={id}
        price={info?.price}
      />
      <BookPageButtons id={id} />
    </Suspense>
  )
}

export default page
