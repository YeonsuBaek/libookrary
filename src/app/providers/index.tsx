'use client'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/locales/i18n'

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[]
}

function Providers({ children }: ProviderProps) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default Providers
