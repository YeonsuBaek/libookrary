'use client'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/locales/i18n'
import { AuthProvider } from '../../stores/AuthContext'

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[]
}

function Providers({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </AuthProvider>
  )
}

export default Providers
