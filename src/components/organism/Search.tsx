'use client'
import { IconButton, TextField } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import RecommendedList from '../molecule/RecommendedList'
import { ChangeEvent, useEffect, useState } from 'react'
import BookList from '../molecule/BookList'
import { debounce } from 'lodash'
import { fetchBestseller, fetchNewSpecial, fetchSearchBook } from '@/apis/book'

interface SearchProps {
  onClose: () => void
}

function Search({ onClose }: SearchProps) {
  const { t } = useTranslation('')
  const [word, setWord] = useState('')
  const [newSpecial, setNewSpecial] = useState([])
  const [bestseller, setBestseller] = useState([])
  const [books, setBooks] = useState([])

  const fetchData = async () => {
    await fetchSearchBook(
      {
        search: word,
      },
      {
        onSuccess: setBooks,
        onError: console.error,
      }
    )
  }

  useEffect(
    function fetchSearchBook() {
      const debounceFetch = debounce(fetchData, 500)
      if (word.length > 0) {
        debounceFetch()
      }

      return () => {
        debounceFetch.cancel()
      }
    },
    [word]
  )

  useEffect(function fetchRecommendation() {
    ;(async () => {
      await fetchNewSpecial({
        onSuccess: setNewSpecial,
        onError: console.error,
      })
      await fetchBestseller({
        onSuccess: setBestseller,
        onError: console.error,
      })
    })()
  }, [])

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
      {books?.length === 0 && (
        <div className="search-recommended">
          <RecommendedList title={t('header.search.recommended.new')} books={newSpecial} />
          <RecommendedList title={t('header.search.recommended.best')} books={bestseller} />
        </div>
      )}
      {books?.length > 0 && (
        <div className="search-book">
          <BookList books={books} />
        </div>
      )}
    </div>
  )
}

export default Search
