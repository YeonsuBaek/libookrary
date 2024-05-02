import { IconButton, TextField } from '@yeonsubaek/yeonsui'
import { useTranslation } from 'react-i18next'
import RecommendedList from '../molecule/RecommendedList'
import { ChangeEvent, useState } from 'react'
import BookList from '../molecule/BookList'

interface SearchProps {
  onClose: () => void
}

function Search({ onClose }: SearchProps) {
  const { t } = useTranslation('')
  const [word, setWord] = useState('')

  return (
    <div className="search">
      <header className="search-header">
        <IconButton icon="Close" onClick={onClose} />
      </header>
      <TextField
        icon="Search"
        placeholder={t('header.search.placeholder')}
        value={word}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setWord(e.target.value)}
      />
      {word.length === 0 && (
        <div className="search-recommended">
          <RecommendedList title={t('header.search.recommended.new')} />
          <RecommendedList title={t('header.search.recommended.best')} />
        </div>
      )}
      {word.length > 0 && (
        <div className="search-book">
          <BookList />
        </div>
      )}
    </div>
  )
}

export default Search
