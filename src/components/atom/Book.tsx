interface BookProps {
  title: string
  page: number
  height: number
  color: string
}

const MAX_HEIGHT = 168

function Book({ title, page, height, color }: BookProps) {
  const sizingHeight = Math.floor(height / 1.8) >= MAX_HEIGHT ? MAX_HEIGHT : Math.floor(height / 1.8)

  return (
    <li className="book" style={{ width: `${page / 10}px` }}>
      <p className="book-side" style={{ height: `${sizingHeight}px`, backgroundColor: color }}>
        {title}
      </p>
    </li>
  )
}

export default Book
