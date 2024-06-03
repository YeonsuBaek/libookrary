'use client'
import { Segmented } from '@yeonsubaek/yeonsui'
import Bookshelf from './Bookshelf/Bookshelf'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { getUserInfoApi } from '@/apis/user'
import UserBookCard from './UserBookCard'
import { LIBRARY_VALUES } from '@/types/library'

function Library() {
  const { t } = useTranslation('')
  const SEGMENTED_LIST = [
    { value: LIBRARY_VALUES.bookshelf, text: t('home.segmented.bookshelf'), id: 'segmented1' },
    { value: LIBRARY_VALUES.list, text: t('home.segmented.list'), id: 'segmented2' },
  ]
  const [nickname, setNickname] = useState<any>(null)
  const [books, setBooks] = useState([])
  const [selectedOption, setSelectedOption] = useState(LIBRARY_VALUES.bookshelf)
  const [userToken, setUserToken] = useState('')

  useEffect(function fetchUserInfo() {
    ;(async () => {
      const info = await getUserInfoApi()
      setNickname(info?.nickname || '')
      setBooks(info?.books || [])
    })()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserToken(localStorage.getItem('userToken') || '')
    }
  }, [])

  if (userToken) {
    return (
      <>
        <Segmented
          id="library-segmented"
          options={SEGMENTED_LIST}
          selectedOption={selectedOption}
          onSelect={(val) => setSelectedOption(val as LIBRARY_VALUES)}
        />
        {selectedOption === LIBRARY_VALUES.bookshelf && <Bookshelf nickname={nickname} books={books} />}
        {selectedOption === LIBRARY_VALUES.list && <UserBookCard books={books} />}
      </>
    )
  }

  return <div className="library-message">{t('book.message.login')}</div>
}

export default Library
