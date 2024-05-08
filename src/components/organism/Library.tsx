'use client'
import { Segmented } from '@yeonsubaek/yeonsui'
import Bookshelf from './Bookshelf'
import BookList from '../molecule/BookList'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { getUserInfo } from '@/apis/user'

function Library() {
  const { t } = useTranslation('')
  const SEGMENTED_LIST = [t('home.segmented.bookshelf'), t('home.segmented.list')]
  const [nickname, setNickname] = useState<any>(null)
  const [books, setBooks] = useState<any>([])
  const [selectedOption, setSelectedOption] = useState(SEGMENTED_LIST[0])

  useEffect(function fetchUserInfo() {
    ;(async () => {
      const info = await getUserInfo()
      setNickname(info?.nickname || '')
      setBooks(info?.books || [])
    })()
  }, [])

  return (
    <>
      <Segmented options={SEGMENTED_LIST} selectedOption={selectedOption} onSelect={setSelectedOption} />
      {selectedOption === SEGMENTED_LIST[0] && <Bookshelf nickname={nickname} books={books} />}
      {selectedOption === SEGMENTED_LIST[1] && <BookList />}
    </>
  )
}

export default Library
