import type { Metadata } from 'next'
import Providers from './providers'

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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
