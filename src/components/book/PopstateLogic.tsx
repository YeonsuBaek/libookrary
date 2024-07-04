'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AddBookProps {
  id: string
}

function PopstateLogic({ id }: AddBookProps) {
  const router = useRouter()

  const handlePopState = () => {
    const backUrl = new URL(window.location.href)
    if (!backUrl.hash.includes(id)) {
      backUrl.hash = id
      router.replace(backUrl.toString(), { shallow: true })
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return null
}

export default PopstateLogic
