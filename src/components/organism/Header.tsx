'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import Search from './Search'
import { useRouter } from 'next/navigation'
import useUserStore from '@/stores/user'

function Header() {
  const router = useRouter()
  const { isLoggedIn: loginState } = useUserStore()
  const [openSearch, setOpenSearch] = useState(false)
  const token = localStorage.getItem('userToken')
  const isLoggedIn = Boolean(token) || loginState

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <Link href="/">
            <IconButton icon="Read" size="large" />
          </Link>
        </div>
        <div className="header-buttons">
          <IconButton icon="Search" size="large" onClick={() => setOpenSearch(true)} />
          <IconButton icon="User" size="large" onClick={() => router.push(isLoggedIn ? '/account' : '/login')} />
        </div>
      </header>
      {openSearch && <Search onClose={() => setOpenSearch(false)} />}
    </>
  )
}

export default Header
