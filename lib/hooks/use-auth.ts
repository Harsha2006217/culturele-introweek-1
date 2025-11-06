import { useState, useEffect } from 'react'
import { getUserByToken, type User } from '../auth/auth'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (!token) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        const user = await getUserByToken(token)
        if (user) {
          setUser(user)
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('auth_token')
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Auth error:', error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { isAuthenticated, isLoading, user }
}