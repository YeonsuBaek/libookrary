'use client'
import { Segmented } from '@yeonsubaek/yeonsui'
import Bookshelf from './Bookshelf/Bookshelf'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { getUserInfoApi } from '@/apis/user'
import UserBookCard from './UserBookCard'

function Library() {
  const { t } = useTranslation('')
  const SEGMENTED_LIST = [t('home.segmented.bookshelf'), t('home.segmented.list')]
  const [nickname, setNickname] = useState<any>(null)
  const [books, setBooks] = useState([])
  const [selectedOption, setSelectedOption] = useState(SEGMENTED_LIST[0])
  const userToken = localStorage.getItem('userToken')

  useEffect(function fetchUserInfo() {
    ;(async () => {
      const info = await getUserInfoApi()
      setNickname(info?.nickname || '')
      setBooks(info?.books || [])
    })()
  }, [])

  if (userToken) {
    return (
      <>
        <Segmented options={SEGMENTED_LIST} selectedOption={selectedOption} onSelect={setSelectedOption} />
        {selectedOption === SEGMENTED_LIST[0] && <Bookshelf nickname={nickname} books={books} />}
        {selectedOption === SEGMENTED_LIST[1] && <UserBookCard books={books} />}
      </>
    )
  }

  return <div className="library-message">{t('book.message.login')}</div>
}

export default Library
