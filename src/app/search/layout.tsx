import SearchBar from '@/components/common/Search/SearchBar'
import { ReactNode } from 'react'

interface SearchLayoutProps {
  children: ReactNode | ReactNode[]
}

function layout({ children }: SearchLayoutProps) {
  return (
    <div className="search">
      <SearchBar />
      {children}
    </div>
  )
}

export default layout
