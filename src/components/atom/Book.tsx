'use client'
import { getBookInfo } from '@/apis/book'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

interface BookProps {
  isbn: string
}

const MIN_DEPTH = 20
const MAX_HEIGHT = 168

function Book({ isbn }: BookProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [color, setColor] = useState('')
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const sizingWidth = useMemo(() => (Math.floor(width / 5) < MIN_DEPTH ? MIN_DEPTH : Math.floor(width / 5)), [width])
  const sizingHeight = useMemo(
    () => (Math.floor(height / 1.8) > MAX_HEIGHT ? MAX_HEIGHT : Math.floor(height / 1.8)),
    [height]
  )

  useEffect(function fetchBookInfo() {
    ;(async () => {
      const info = await getBookInfo({ isbn })
      setTitle(info?.title || '')
      setColor(info?.color || [])
      setWidth(info?.depth || '')
      setHeight(info?.height || [])
    })()
  }, [])

  return (
    <li className="book" style={{ width: `${sizingWidth}px` }}>
      <button
        onClick={() => router.push(`/book/${isbn}`)}
        className="book-side"
        style={{ height: `${sizingHeight}px`, backgroundColor: color }}
      >
        {title}
      </button>
    </li>
  )
}

export default Book
