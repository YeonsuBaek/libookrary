'use client'
import { useAuth } from '../stores/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from '@yeonsubaek/yeonsui'
import Library from '../components/book/Library'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/')
      } else {
        router.push('/login')
      }
    }
  }, [user, loading, router])

  if (loading) {
    return <Spinner />
  }

  return user ? <Library /> : null
}
