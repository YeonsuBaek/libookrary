'use client'
import { useTranslation } from 'react-i18next'

interface PageTitleProps {
  route: string
}

function PageTitle({ route }: PageTitleProps) {
  const { t } = useTranslation('')

  return <h2 className="title">{t(route)}</h2>
}

export default PageTitle
