import type { Metadata } from 'next'
import '../styles/index.scss'
import Providers from './providers'
import Header from '@/components/common/Header'

export const metadata: Metadata = {
  title: '라이북러리 | Libookrary',
  description: '가상의 책꽂이',
}

const ScriptTheme = () => {
  const codeToRunOnClient = `(function() {
    const colorMode = localStorage.getItem('theme') || 'theme-light'
    document.body.classList.add(colorMode)
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
      <body className="polar">
        <ScriptTheme />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
