'use client'
import { TextField } from '@yeonsubaek/yeonsui'
import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface SearchBarProps {
  word: string
  setWord: (newWord: string) => void
}

const SearchBar = ({ word, setWord }: SearchBarProps) => {
  const { t } = useTranslation('')

  return (
    <TextField
      id="header-search"
      icon="Search"
      placeholder={t('header.search.placeholder')}
      value={word}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
    />
  )
}

export default SearchBar
