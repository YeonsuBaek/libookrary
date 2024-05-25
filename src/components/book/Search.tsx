'use client'
import { IconButton, TextField } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import RecommendedList from './RecommendedList'
import { ChangeEvent, useEffect, useState, useRef, useCallback } from 'react'
import { debounce } from 'lodash'
import { fetchBestseller, fetchNewSpecial, fetchSearchBook } from '@/apis/book'
import { useSearchStore } from '@/stores/search'
import BookCardList from './BookCard/BookCardList'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

type fetchStateType = 'idle' | 'loading' | 'fetched' | 'error'

function Search() {
  const { t } = useTranslation('')
  const { isOpenSearch, setIsOpenSearch } = useSearchStore()
  const [word, setWord] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [newSpecial, setNewSpecial] = useState([])
  const [bestseller, setBestseller] = useState([])
  const [books, setBooks] = useState<any[]>([])
  const [startIndex, setStartIndex] = useState(1)
  const [fetchState, setFetchState] = useState<fetchStateType>('idle')
  const moreRef = useRef<HTMLDivElement>(null)
  const { isIntersecting } = useIntersectionObserver(moreRef, { threshold: 0.5 })

  const handleCloseSearch = () => {
    setIsOpenSearch(false)
    setWord('')
    setBooks([])
  }

  const fetchNewData = useCallback(
    (isSearchAgain: boolean) => {
      setFetchState('loading')
      fetchSearchBook(
        {
          search: word,
          startIndex,
        },
        {
          onSuccess: (res) => {
            setBooks((prev) => (isSearchAgain ? res : [...prev, ...res]))
            if (res.length > 0) setStartIndex((prev) => prev + 1)
            setFetchState('fetched')
            setSearchWord(word)
          },
          onError: (error) => {
            console.error(error)
            setFetchState('error')
          },
        }
      )
    },
    [word, startIndex, searchWord]
  )

  useEffect(
    function fetchSearchBookAPI() {
      if (isOpenSearch) {
        const needToSearchAgain = word.trim() !== searchWord.trim()
        if (needToSearchAgain) {
          const debounceFetch = debounce(() => fetchNewData(needToSearchAgain), 500)
          debounceFetch()

          return () => {
            debounceFetch.cancel()
          }
        } else if (isIntersecting) {
          fetchNewData(needToSearchAgain)
        }
      }
    },
    [isOpenSearch, word, isIntersecting]
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
    <div className='search'>
      <header className='search-header'>
        <IconButton icon='Close' onClick={handleCloseSearch} />
      </header>
      <TextField
        icon='Search'
        placeholder={t('header.search.placeholder')}
        value={word}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
      />
      <div className={`search-recommended ${books?.length > 0 || fetchState === 'loading' ? 'hidden' : ''}`}>
        <RecommendedList title={t('header.search.recommended.new')} books={newSpecial} />
        <RecommendedList title={t('header.search.recommended.best')} books={bestseller} />
      </div>

      <div className='search-book'>
        <BookCardList books={books} isAddRoute />
      </div>

      {/* 🔴 Problem: 영역이 0일때 안됨! 원래 됐는데! */}
      {/* 🔴 Problem: 한 페이지 안에서 데이터 패칭이 끝나면? */}
      {fetchState === 'fetched' && books.length > 0 && <div style={{ height: '20px' }} ref={moreRef} />}
      {fetchState === 'loading' && <div>Loading</div>}
    </div>
  ) : null
}

export default Search
