'use client'
import { useSearchStore } from '@/stores/search'
import { TextField } from '@yeonsubaek/yeonsui'
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
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

  const onEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <TextField
      id="header-search"
      placeholder={t('header.search.placeholder')}
      value={word}
      onChange={setWord}
      onKeyDown={onEnter}
      // TODO: Search TextField
      // onSearch={handleSearch}
    />
  )
}

export default SearchBar
