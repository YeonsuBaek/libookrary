'use client'
import { IconButton } from '@yeonsubaek/yeonsui'
import Link from 'next/link'

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <Link href="/">
          <IconButton icon="Read" size="large" />
        </Link>
      </div>
      <div className="header-buttons">
        <IconButton icon="Search" size="large" />
        <Link href="/account">
          <IconButton icon="User" size="large" />
        </Link>
      </div>
    </header>
  )
}

export default Header
