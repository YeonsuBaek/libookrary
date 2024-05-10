import { Card } from '@yeonsubaek/yeonsui'

interface BookCardProps {
  title: string
  author: string
  cover: string
}

function BookCard({ title, author, cover }: BookCardProps) {
  return (
    <li className="book-card" key={title}>
      <Card title={title} info={author} image={cover} />
    </li>
  )
}

export default BookCard
