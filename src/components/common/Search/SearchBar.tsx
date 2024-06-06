'use client'
import { TextField } from '@yeonsubaek/yeonsui'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface SearchBarProps {
  onSearch: (word: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const { t } = useTranslation('')
  const [word, setWord] = useState('')

  return (
    <>
      <TextField
        id="header-search"
        icon="Search"
        placeholder={t('header.search.placeholder')}
        value={word}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
      />
      <button type="button" onClick={() => onSearch(word)}>
        Search
      </button>
    </>
  )
}

export default SearchBar
