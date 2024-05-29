'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'
import { useTranslation } from 'react-i18next'

function Header() {
  const router = useRouter()
  const { t } = useTranslation('')
  const { isLoggedIn: loginState } = useUserStore()
  const { isOpenSearch, setIsOpenSearch } = useSearchStore()
  const token = localStorage.getItem('userToken')
  const isLoggedIn = Boolean(token) || loginState

  return (
    <>
      <header className="header">
        <Link href="/">
          <div className="header-logo">
            <IconButton icon="Read" size="large" onClick={() => isOpenSearch && setIsOpenSearch(false)} />
            <h1 className="header-title sm-hidden">{t('header.title')}</h1>
          </div>
        </Link>
        <div className="header-buttons">
          <IconButton icon="Search" size="large" onClick={() => setIsOpenSearch(true)} />
          <IconButton icon="User" size="large" onClick={() => router.push(isLoggedIn ? '/account' : '/login')} />
        </div>
      </header>
    </>
  )
}

export default Header
