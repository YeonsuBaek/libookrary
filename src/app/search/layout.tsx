import SearchBar from '@/components/common/Search/SearchBar'
import SearchHeader from '@/components/common/Search/SearchHeader'
import { ReactNode } from 'react'

interface SearchLayoutProps {
  children: ReactNode | ReactNode[]
}

function layout({ children }: SearchLayoutProps) {
  return (
    <div className="search">
      <SearchHeader />
      <SearchBar />
      {children}
    </div>
  )
}

export default layout
