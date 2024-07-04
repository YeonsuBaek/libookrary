'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'
import { useEffect, useState } from 'react'

function Header() {
  const router = useRouter()
  const { isLoggedIn, setIsLoggedIn } = useUserStore()
  const { searchWord, setSearchWord } = useSearchStore()
  const [themeIcon, setThemeIcon] = useState<'Sun' | 'Moon'>('Sun')

  const handleChangeTheme = () => {
    if (localStorage.getItem('theme') === 'theme-light') {
      localStorage.setItem('theme', 'theme-dark')
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
      setThemeIcon('Moon')
    } else {
      localStorage.setItem('theme', 'theme-light')
      document.body.classList.add('theme-light')
      document.body.classList.remove('theme-dark')
      setThemeIcon('Sun')
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(Boolean(localStorage.getItem('userToken')) || isLoggedIn)
      setThemeIcon(localStorage.getItem('theme') === 'theme-dark' ? 'Moon' : 'Sun')
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
        <IconButton icon={themeIcon} size="large" onClick={handleChangeTheme} />
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
