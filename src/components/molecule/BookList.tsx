'use client'
import BookCard from '../atom/BookCard'

interface BookType {
  title: string
  author: string
  cover: string
  page: number
  sizeHeight: number
  color: string
}

interface BookListProps {
  sort?: 'wrap' | 'nowrap'
}

const dummyList: BookType[] = [
  { title: '트로피컬 나이트', author: '저자/아티스트', cover: '', page: 200, sizeHeight: 800, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', author: '저자/아티스트', cover: '', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', author: '저자/아티스트', cover: '', page: 300, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', author: '저자/아티스트', cover: '', page: 240, sizeHeight: 290, color: '#b5f5ec' },
  { title: '트로피컬 나이트', author: '저자/아티스트', cover: '', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', author: '저자/아티스트', cover: '', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', author: '저자/아티스트', cover: '', page: 400, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', author: '저자/아티스트', cover: '', page: 320, sizeHeight: 290, color: '#b5f5ec' },
  { title: '트로피컬 나이트', author: '저자/아티스트', cover: '', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '트로피컬 나이트', author: '저자/아티스트', cover: '', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', author: '저자/아티스트', cover: '', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', author: '저자/아티스트', cover: '', page: 300, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', author: '저자/아티스트', cover: '', page: 240, sizeHeight: 290, color: '#b5f5ec' },
  { title: '트로피컬 나이트', author: '저자/아티스트', cover: '', page: 200, sizeHeight: 180, color: '#ff7875' },
  { title: '칵테일, 러브, 좀비', author: '저자/아티스트', cover: '', page: 150, sizeHeight: 240, color: 'ffc069' },
  { title: '어린이라는 세계', author: '저자/아티스트', cover: '', page: 300, sizeHeight: 150, color: '#bae7ff' },
  { title: '수치심 탐구 생활', author: '저자/아티스트', cover: '', page: 240, sizeHeight: 290, color: '#b5f5ec' },
]

function BookList({ sort = 'wrap' }: BookListProps) {
  return (
    <ul className={`book-list ${sort}`}>
      {dummyList.map(({ title, author, cover }: BookType) => (
        <BookCard key={title} title={title} author={author} cover={cover} />
      ))}
    </ul>
  )
}

export default BookList
