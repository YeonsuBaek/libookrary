'use client'
import Books from '@/components/molecule/Books'
import { Segmented } from '@yeonsubaek/yeonsui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation('')
  const SEGMENTED_LIST = [t('home.segmented.bookshelf'), t('home.segmented.list')]
  const [selectedOption, setSelectedOption] = useState(SEGMENTED_LIST[0])

  return (
    <div className="home">
      <Segmented options={SEGMENTED_LIST} selectedOption={selectedOption} onSelect={setSelectedOption} />

      {selectedOption === SEGMENTED_LIST[0] && (
        <>
          <h2 className="home-title">{t('home.title')}</h2>
          <Books />
        </>
      )}
    </div>
  )
}
