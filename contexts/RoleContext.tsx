"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { getRoles, type Role } from "@/services/roleService"

interface RoleContextType {
  roles: Role[]
  refreshRoles: () => Promise<void>
  isLoading: boolean
  error: string | null
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

interface RoleProviderProps {
  children: ReactNode
}

export function RoleProvider({ children }: RoleProviderProps) {
  const [roles, setRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refreshRoles = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const rolesData = await getRoles()
      setRoles(rolesData)
    } catch (err: any) {
      console.error("Error al cargar roles:", err)
      setError(err.message || "No se pudieron cargar los roles")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshRoles()
  }, [])

  return (
    <RoleContext.Provider value={{ roles, refreshRoles, isLoading, error }}>
      {children}
    </RoleContext.Provider>
  )
}

export function useRoles() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRoles debe ser usado dentro de un RoleProvider")
  }
  return context
}
