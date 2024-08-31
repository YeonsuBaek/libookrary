'use client'
import { Spinner, SegmentedControl } from '@yeonsubaek/yeonsui'
import Bookshelf from './Bookshelf/Bookshelf'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { getUserInfoApi } from '@/apis/user'
import UserBookCard from './UserBookCard'
import { LIBRARY_VALUES } from '@/types/library'
import { LoginStatusType } from '@/types/user'

function Library() {
  const { t } = useTranslation('')
  const SEGMENTED_LIST = [
    { value: LIBRARY_VALUES.bookshelf, text: t('home.segmented.bookshelf'), id: 'segmented1' },
    { value: LIBRARY_VALUES.list, text: t('home.segmented.list'), id: 'segmented2' },
  ]
  const [loadingStatus, setLoadingStatus] = useState<LoginStatusType>('loading')
  const [nickname, setNickname] = useState<any>(null)
  const [books, setBooks] = useState([])
  const [selectedOption, setSelectedOption] = useState(LIBRARY_VALUES.bookshelf)

  useEffect(function fetchUserInfo() {
    ;(async () => {
      const info = await getUserInfoApi()
      setNickname(info?.nickname || '')
      setBooks(info?.books || [])
    })()
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoadingStatus(localStorage.getItem('userToken') ? 'signedIn' : 'signedOut')
    }
  }, [])

  if (loadingStatus === 'signedIn' && nickname) {
    return (
      <>
        <SegmentedControl
          resizing="fill"
          selectedValue={selectedOption}
          onChange={(val) => setSelectedOption(val as LIBRARY_VALUES)}
        >
          {SEGMENTED_LIST.map((segmented) => {
            return (
              <SegmentedControl.Button key={segmented.id} value={segmented.value}>
                {segmented.text}
              </SegmentedControl.Button>
            )
          })}
        </SegmentedControl>
        {selectedOption === LIBRARY_VALUES.bookshelf && <Bookshelf nickname={nickname} books={books} />}
        {selectedOption === LIBRARY_VALUES.list && <UserBookCard books={books} />}
      </>
    )
  }

  if (loadingStatus === 'signedOut') {
    return <div className="library-message">{t('book.message.login')}</div>
  }

  return (
    <div className="library-loading">
      <Spinner />
      <p>{t('book.message.enter')}</p>
    </div>
  )
}

export default Library
