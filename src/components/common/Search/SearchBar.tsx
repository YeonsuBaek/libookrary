'use client'
import { useSearchStore } from '@/stores/search'
import { TextField } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

const SearchBar = () => {
  const { t } = useTranslation('')
  const router = useRouter()
  const { searchWord } = useSearchStore()
  const [word, setWord] = useState(decodeURI(decodeURIComponent(searchWord)))

  const handleSearch = () => {
    const needToSearchAgain = word.trim() !== searchWord.trim()
    if (needToSearchAgain) {
      router.push(`/search/${word}`)
    }
  }

  return (
    <>
      <TextField
        id="header-search"
        icon="Search"
        placeholder={t('header.search.placeholder')}
        value={word}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
    </>
  )
}

export default SearchBar
