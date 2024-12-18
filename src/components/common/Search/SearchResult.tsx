'use client'

import { fetchSearchBook } from '@/apis/book'
import BookCardList from '@/components/book/BookCard/BookCardList'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useSearchStore } from '@/stores/search'
import { CloudLightningIcon, Spinner } from '@yeonsubaek/yeonsui'
import { useCallback, useEffect, useRef } from 'react'

interface SearchResultProps {
  searchParam: string
}

const SearchResult = ({ searchParam }: SearchResultProps) => {
  const moreRef = useRef(null)
  const { isIntersecting } = useIntersectionObserver(moreRef)
  const {
    searchWord,
    setSearchWord,
    setFetchState,
    books,
    setAddBooks,
    setNewBooks,
    searchIndex,
    setSearchIndex,
    fetchState,
  } = useSearchStore()

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
            isSearchAgain ? setNewBooks(res) : setAddBooks(res)
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

  useEffect(() => {
    const needToSearchAgain = searchParam.trim() !== searchWord.trim()
    if (needToSearchAgain) {
      fetchNewData({ searchParam: searchParam, startIndex: 1 }, needToSearchAgain)
    } else if (isIntersecting) {
      fetchNewData({ searchParam: searchWord, startIndex: searchIndex })
    }
  }, [isIntersecting])

  return (
    <>
      <div className="search-book">
        <BookCardList books={books} isAddRoute width={150} />
      </div>
      {books.length > 0 && <div style={{ height: '1px' }} ref={moreRef} />}
      {fetchState === 'loading' && (
        <div className="search-loading">
          <Spinner />
        </div>
      )}
      {fetchState === 'fetched' && books.length === 0 && (
        <div className="search-no-result">
          {/* Unsmily Icon 추가 */}
          <CloudLightningIcon size={32} />
          <p className="search-no-result-message">도서 결과가 존재하지 않습니다.</p>
        </div>
      )}
    </>
  )
}

export default SearchResult
