'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { auth } from '../../firebase.config'
import { onAuthStateChanged, User } from 'firebase/auth'

interface AuthContextProps {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
