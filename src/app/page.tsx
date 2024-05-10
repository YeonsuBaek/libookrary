import Library from '@/components/organism/Library'
import Search from '@/components/organism/Search'

interface HomeProps {
  isSearchProps?: boolean
}

export default function Home() {
  return (
    <div className="home">
      <Library />
      <Search />
    </div>
  )
}
