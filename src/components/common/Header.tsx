'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'

function Header() {
  const router = useRouter()
  const { isLoggedIn: loginState } = useUserStore()
  const { isOpenSearch, setIsOpenSearch } = useSearchStore()
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('userToken') || loginState : loginState

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link href="/">
            <IconButton icon="Read" size="large" onClick={() => isOpenSearch && setIsOpenSearch(false)} />
          </Link>
        </div>
        <div className="header-buttons">
          <IconButton icon="Search" size="large" onClick={() => setIsOpenSearch(true)} />
          <IconButton icon="User" size="large" onClick={() => router.push(isLoggedIn ? '/account' : '/login')} />
        </div>
      </header>
    </>
  )
}

export default Header
