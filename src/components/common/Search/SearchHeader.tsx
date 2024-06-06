'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'

const SearchHeader = () => {
  const router = useRouter()

  return (
    <header className="search-header">
      <IconButton icon="Close" onClick={() => router.push('/')} />
    </header>
  )
}

export default SearchHeader
