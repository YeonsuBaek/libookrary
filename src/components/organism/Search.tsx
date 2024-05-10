'use client'
import { IconButton, TextField } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import RecommendedList from '../molecule/RecommendedList'
import { ChangeEvent, useEffect, useState } from 'react'
import BookList from '../molecule/BookList'
import { debounce } from 'lodash'

interface SearchProps {
  onClose: () => void
}

function Search({ onClose }: SearchProps) {
  const { t } = useTranslation('')
  const [word, setWord] = useState('')
  const [books, setBooks] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/book/search?query=${word}`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setBooks(data.item)
    } catch (error) {
      console.error('Error: ' + error)
    }
  }

  useEffect(() => {
    const debounceFetch = debounce(fetchData, 500)
    debounceFetch()

    return () => {
      debounceFetch.cancel()
    }
  }, [word])

  return (
    <div className="search">
      <header className="search-header">
        <IconButton icon="Close" onClick={onClose} />
      </header>
      <TextField
        icon="Search"
        placeholder={t('header.search.placeholder')}
        value={word}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
      />
      {word.length === 0 && (
        <div className="search-recommended">
          <RecommendedList title={t('header.search.recommended.new')} />
          <RecommendedList title={t('header.search.recommended.best')} />
        </div>
      )}
      {word.length > 0 && (
        <div className="search-book">
          <BookList books={books} />
        </div>
      )}
    </div>
  )
}

export default Search
