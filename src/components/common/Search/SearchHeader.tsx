'use client'
import { useSearchStore } from '@/stores/search'
import { IconButton } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'

const SearchHeader = () => {
  const router = useRouter()
  const { setSearchWord } = useSearchStore()

  return (
    <header className="search-header">
      <IconButton
        icon="Close"
        onClick={() => {
          setSearchWord('')
          router.push('/')
        }}
      />
    </header>
  )
}

export default SearchHeader
