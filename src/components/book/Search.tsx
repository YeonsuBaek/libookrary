'use client'
import { IconButton, TextField } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import RecommendedList from './RecommendedList'
import { ChangeEvent, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { fetchBestseller, fetchNewSpecial, fetchSearchBook } from '@/apis/book'
import { useSearchStore } from '@/stores/search'
import BookCardList from './BookCard/BookCardList'

function Search() {
  const { t } = useTranslation('')
  const { isOpenSearch, setIsOpenSearch } = useSearchStore()
  const [word, setWord] = useState('')
  const [newSpecial, setNewSpecial] = useState([])
  const [bestseller, setBestseller] = useState([])
  const [books, setBooks] = useState([])

  const handleCloseSearch = () => {
    setIsOpenSearch(false)
    setWord('')
    setBooks([])
  }

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
      if (isOpenSearch) {
        debounceFetch()
      }

      return () => {
        debounceFetch.cancel()
      }
    },
    [isOpenSearch, word]
  )

  useEffect(
    function fetchRecommendation() {
      if (isOpenSearch) {
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
      }
    },
    [isOpenSearch]
  )

  return isOpenSearch ? (
    <div className="search">
      <header className="search-header">
        <IconButton icon="Close" onClick={handleCloseSearch} />
      </header>
      <TextField
        icon="Search"
        placeholder={t('header.search.placeholder')}
        value={word}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
      />
      <div className={`search-recommended ${books?.length > 0 ? 'hidden' : ''}`}>
        <RecommendedList title={t('header.search.recommended.new')} books={newSpecial} />
        <RecommendedList title={t('header.search.recommended.best')} books={bestseller} />
      </div>
      {books?.length > 0 && (
        <div className="search-book">
          <BookCardList books={books} isAddRoute />
        </div>
      )}
    </div>
  ) : null
}

export default Search
