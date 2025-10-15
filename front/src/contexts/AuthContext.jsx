import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/profile', {
        credentials: 'include',
      })

      console.log(`response.ok = ${JSON.stringify(response.ok)}`)
      console.log(`response.status = ${JSON.stringify(response.status)}`)

      if (response.ok) {
        const data = await response.json()
        console.log(`data.user = ${JSON.stringify(data.user)}`)
        setUser(data.user)
        return { success: true }
      } else {
        setUser(null)
        return { success: false }
      }
    } catch (error) {
      console.error(error)
      setUser(null)
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const login = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
      return { success: response.ok }
    } catch (error) {
      console.error(error)
      return {
        success: false,
        error: 'invalid_response'
      }
    }
  }

  const createAccount = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
      return { success: response.ok }
    } catch (error) {
      console.error(error)
      return {
        success: false,
        error: 'invalid_response'
      }
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const contextValue = {
    user,
    login,
    createAccount,
    getProfile,
    isLoggedIn: !!user,
    loading,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
