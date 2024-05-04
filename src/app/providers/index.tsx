'use client'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/locales/i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface ProviderProps {
  children: React.ReactNode | React.ReactNode[]
}

function Providers({ children }: ProviderProps) {
  const queryClient = new QueryClient()

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  )
}

export default Providers
