'use client'
import BookList from '@/components/molecule/BookList'
import Books from '@/components/molecule/Books'
import { useGetUserInfo } from '@/hooks/useUser'
import { Segmented } from '@yeonsubaek/yeonsui'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation('')
  const userToken = localStorage.getItem('userToken')
  const { data, refetch } = useGetUserInfo()
  const SEGMENTED_LIST = [t('home.segmented.bookshelf'), t('home.segmented.list')]
  const [selectedOption, setSelectedOption] = useState(SEGMENTED_LIST[0])

  const bookshelfTitle = useMemo(() => {
    if (Boolean(userToken)) return t('home.title', { nickname: data?.nickname })
    return '로그인 후 이용해주세요.'
  }, [data])

  useEffect(() => {
    if (userToken) {
      refetch()
    }
  }, [userToken])

  return (
    <div className="home">
      <Segmented options={SEGMENTED_LIST} selectedOption={selectedOption} onSelect={setSelectedOption} />

      {selectedOption === SEGMENTED_LIST[0] && (
        <>
          <h2 className="home-title">{bookshelfTitle}</h2>
          {Boolean(userToken) && <Books />}
        </>
      )}
      {selectedOption === SEGMENTED_LIST[1] && <BookList />}
    </div>
  )
}
