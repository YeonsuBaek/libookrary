import { fetchAladinBookInfo, getBookInfo } from '@/apis/book'
import BookInfo from '@/components/book/BookInfo'
import PopstateLogic from '@/components/book/PopstateLogic'
import ReadingAdd from '@/components/book/ReadingAdd'
import PageTitle from '@/components/common/PageTitle'
import Skeleton from '@/components/common/Skeleton'
import { getBookColor } from '@/utils/color'
import { Suspense } from 'react'

async function page({ params }: { params: { id: string } }) {
  const { id } = params
  const info = await fetchAladinBookInfo({ isbn: id })
  const colorList = await getBookColor(info.cover)

  return (
    <Suspense fallback={<Skeleton />}>
      <PageTitle route={info.title} />
      <ReadingAdd isbn={id} title={info.title} cover={info.cover} colorList={colorList} />
      <BookInfo
        author={info.author}
        publisher={info.publisher}
        pubdate={info.pubDate}
        desc={info.desc}
        category={info.category}
        isbn={id}
        price={info.price}
      />
      <PopstateLogic id={id} />
    </Suspense>
  )
}

export default page
