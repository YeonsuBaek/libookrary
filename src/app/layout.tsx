import type { Metadata } from 'next'
import '../styles/index.scss'
import Providers from './providers'
import Header from '@/components/common/Header'

export const metadata: Metadata = {
  metadataBase: new URL('https://libookrary.vercel.app'),
  title: '라이북러리 | Libookrary',
  description: '가상의 책꽂이',
  openGraph: {
    title: '라이북러리 | Libookrary',
    type: 'website',
    description: '나만의 책꽂이를 만들어봐요!',
    images: '@/publish/image-og.jpg',
  },
}

const ScriptTheme = () => {
  const codeToRunOnClient = `(function() {
    const colorMode = localStorage.getItem('theme') || 'theme-light'
    document.body.classList.add(colorMode)
    const langMode = localStorage.getItem('lang') || 'ko'
    document.body.classList.add(langMode)
  })()`

  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>
        <ScriptTheme />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
