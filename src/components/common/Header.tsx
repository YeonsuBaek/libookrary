'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'
import { useEffect, useState } from 'react'

function Header() {
  const router = useRouter()
  const { isLoggedIn: loginState } = useUserStore()
  const { isOpenSearch, setIsOpenSearch } = useSearchStore()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(Boolean(localStorage.getItem('userToken')) || loginState)
    }
  }, [])

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
