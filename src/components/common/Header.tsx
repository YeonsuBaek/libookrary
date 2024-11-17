'use client'
import { BookOpenTextIcon, Button, SearchIcon, SunIcon, MoonIcon, UserIcon } from '@yeonsubaek/yeonsui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/stores/user'
import { useSearchStore } from '@/stores/search'
import { useEffect, useMemo, useState } from 'react'

function Header() {
  const router = useRouter()
  const { isLoggedIn, setIsLoggedIn } = useUserStore()
  const { searchWord, setSearchWord } = useSearchStore()
  const [isLightTheme, setIsLightTheme] = useState(true)

  const handleChangeTheme = () => {
    if (localStorage.getItem('theme') === 'theme-light') {
      localStorage.setItem('theme', 'theme-dark')
      document.body.classList.add('theme-dark')
      document.body.classList.remove('theme-light')
      setIsLightTheme(false)
    } else {
      localStorage.setItem('theme', 'theme-light')
      document.body.classList.add('theme-light')
      document.body.classList.remove('theme-dark')
      setIsLightTheme(true)
    }
  }

  const ThemeIcon = useMemo(() => (isLightTheme ? SunIcon : MoonIcon), [isLightTheme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(Boolean(localStorage.getItem('userToken')) || isLoggedIn)
      setIsLightTheme(localStorage.getItem('theme') !== 'theme-dark')
    }
  }, [])

  return (
    <header className="header">
      <div className="header-logo">
        <Link href="/">
          <Button styleType="icon" styleVariant="primary">
            <BookOpenTextIcon />
          </Button>
        </Link>
      </div>
      <div className="header-buttons">
        <Button styleType="icon" styleVariant="primary" onClick={handleChangeTheme}>
          {<ThemeIcon size={24} />}
        </Button>
        <Button
          styleType="icon"
          styleVariant="primary"
          onClick={() => {
            router.push('/search')
            if (searchWord) setSearchWord('')
          }}
        >
          <SearchIcon />
        </Button>
        <Button styleType="icon" styleVariant="primary" onClick={() => router.push(isLoggedIn ? '/account' : '/login')}>
          <UserIcon />
        </Button>
      </div>
    </header>
  )
}

export default Header
