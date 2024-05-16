'use client'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

interface BookshelfItemProps {
  isbn: string
  title: string
  depth: number
  height: number
  color: string
}

const MIN_DEPTH = 20
const MAX_HEIGHT = 168

function BookshelfItem({ isbn, title, depth, height, color }: BookshelfItemProps) {
  const router = useRouter()

  const sizingWidth = useMemo(() => (Math.floor(depth / 5) < MIN_DEPTH ? MIN_DEPTH : Math.floor(depth / 5)), [depth])
  const sizingHeight = useMemo(
    () => (Math.floor(height / 1.8) > MAX_HEIGHT ? MAX_HEIGHT : Math.floor(height / 1.8)),
    [height]
  )

  return (
    <li className="bookshelf-item" style={{ width: `${sizingWidth}px` }}>
      <button
        onClick={() => router.push(`/book/${isbn}`)}
        className="bookshelf-item-side"
        style={{ height: `${sizingHeight}px`, backgroundColor: color }}
      >
        {title}
      </button>
    </li>
  )
}

export default BookshelfItem
