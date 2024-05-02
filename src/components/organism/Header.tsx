'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import Link from 'next/link'
import { useState } from 'react'
import Search from './Search'
import { useRouter } from 'next/navigation'

function Header() {
  const router = useRouter()
  const [openSearch, setOpenSearch] = useState(false)

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
          <IconButton icon="User" size="large" onClick={() => router.push('/login')} />
        </div>
      </header>
      {openSearch && <Search onClose={() => setOpenSearch(false)} />}
    </>
  )
}

export default Header
