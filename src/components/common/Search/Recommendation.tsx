'use client'
import { fetchBestseller, fetchNewSpecial } from '@/apis/book'
import RecommendedList from '@/components/book/RecommendedList'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchStateType } from './SearchContent'

const Recommendation = () => {
  const { t } = useTranslation('')
  const [newSpecial, setNewSpecial] = useState([])
  const [bestseller, setBestseller] = useState([])

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
    <div className="search-recommended">
      <RecommendedList title={t('header.search.recommended.new')} books={newSpecial} />
      <RecommendedList title={t('header.search.recommended.best')} books={bestseller} />
    </div>
  )
}

export default Recommendation
