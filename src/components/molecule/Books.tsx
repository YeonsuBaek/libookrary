'use client'
import { useTranslation } from 'react-i18next'
import Book from '../atom/Book'

interface BookType {
  title: string
  page: number
  sizeHeight: number
  color: string
}

const dummyList: BookType[] = [
  { title: '트로피컬 나이트', page: 200, sizeHeight: 800, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', page: 300, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', page: 240, sizeHeight: 290, color: '#b5f5ec' },
  { title: '트로피컬 나이트', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', page: 400, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', page: 320, sizeHeight: 290, color: '#b5f5ec' },
  { title: '트로피컬 나이트', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '트로피컬 나이트', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', page: 300, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', page: 240, sizeHeight: 290, color: '#b5f5ec' },
  { title: '트로피컬 나이트', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', page: 300, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', page: 240, sizeHeight: 290, color: '#b5f5ec' },
]

function Books() {
  const { t } = useTranslation('')

  if (dummyList.length === 0) {
    return <div className="books-blank">{t('home.blank')}</div>
  }

  return (
    <ul className="books">
      {dummyList.map(({ title, page, sizeHeight, color }: BookType) => (
        <Book title={title} page={page} key={title} height={sizeHeight} color={color} />
      ))}
    </ul>
  )
}

export default Books
