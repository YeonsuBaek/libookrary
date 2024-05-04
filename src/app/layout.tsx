import type { Metadata } from 'next'
import '../styles/index.scss'
import Providers from './providers'
import Header from '@/components/organism/Header'

export const metadata: Metadata = {
  title: '라이북러리 | Libookrary',
  description: '가상의 책꽂이',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="theme-light polar">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
