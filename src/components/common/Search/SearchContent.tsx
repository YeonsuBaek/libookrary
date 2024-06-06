'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Recommendation from './Recommendation'
import SearchBar from './SearchBar'
import { debounce } from 'lodash'
import { fetchSearchBook } from '@/apis/book'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import BookCardList from '@/components/book/BookCard/BookCardList'

export type fetchStateType = 'idle' | 'loading' | 'fetched' | 'error'

const SearchContent = () => {
  const [searchWord, setSearchWord] = useState('')
  const [books, setBooks] = useState<any[]>([])
  const [searchIndex, setSearchIndex] = useState(1)
  const [fetchState, setFetchState] = useState<fetchStateType>('idle')
  const moreRef = useRef(null)
  const { isIntersecting } = useIntersectionObserver(moreRef)

  const fetchNewData = useCallback(
    ({ searchParam, startIndex }: { searchParam: string; startIndex: number }, isSearchAgain: boolean = false) => {
      setFetchState('loading')
      fetchSearchBook(
        {
          search: searchParam,
          startIndex,
        },
        {
          onSuccess: (res) => {
            setBooks((prev) => (isSearchAgain ? res : [...prev, ...res]))
            if (res.length > 0) setSearchIndex(startIndex + 1)
            setFetchState('fetched')
            setSearchWord(searchParam)
          },
          onError: (error) => {
            console.error(error)
            setFetchState('error')
          },
        }
      )
    },
    []
  )

  const handleSearch = (word: string) => {
    const needToSearchAgain = word.trim() !== searchWord.trim()
    if (needToSearchAgain) {
      fetchNewData({ searchParam: word, startIndex: 1 }, needToSearchAgain)
    }
  }

  useEffect(() => {
    if (isIntersecting) {
      fetchNewData({ searchParam: searchWord, startIndex: searchIndex })
    }
  }, [isIntersecting])

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {(books?.length === 0 || fetchState === 'idle') && <Recommendation />}
      <div className="search-book">
        <BookCardList books={books} isAddRoute />
      </div>
      {books.length > 0 && <div style={{ height: '1px' }} ref={moreRef} />}
      {fetchState === 'loading' && <div>Loading</div>}
    </>
  )
}

export default SearchContent
