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
  const { searchWord, setSearchWord } = useSearchStore()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleChangeTheme = () => {
    if (localStorage.getItem('theme') === 'theme-light') {
      localStorage.setItem('theme', 'theme-dark')
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
    } else {
      localStorage.setItem('theme', 'theme-light')
      document.body.classList.add('theme-light')
      document.body.classList.remove('theme-dark')
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(Boolean(localStorage.getItem('userToken')) || loginState)
    }
  }, [])

  return (
    <header className="header">
      <div className="header-logo">
        <Link href="/">
          <IconButton icon="Read" size="large" />
        </Link>
      </div>
      <div className="header-buttons">
        <IconButton icon="Fire" onClick={handleChangeTheme} />
        <IconButton
          icon="Search"
          size="large"
          onClick={() => {
            router.push('/search')
            if (searchWord) setSearchWord('')
          }}
        />
        <IconButton icon="User" size="large" onClick={() => router.push(isLoggedIn ? '/account' : '/login')} />
      </div>
    </header>
  )
}

export default Header
