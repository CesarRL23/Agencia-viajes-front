"use client"

import { createContext, useContext, useState, useEffect } from 'react'
import { User, getUsers } from '@/services/userService'

interface UserContextType {
  users: User[]
  setUsers: (users: User[]) => void
  refreshUsers: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([])

  const refreshUsers = async () => {
    try {
      const response = await getUsers()
      setUsers(response)
    } catch (error) {
      console.error('Error al refrescar usuarios:', error)
    }
  }

  useEffect(() => {
    refreshUsers()
  }, [])

  return (
    <UserContext.Provider value={{ users, setUsers, refreshUsers }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUsers = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUsers debe usarse dentro de UserProvider')
  }
  return context
}