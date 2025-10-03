"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield } from "lucide-react"
import { getUsers } from "@/services/userService"
import type { User } from "@/services/userService"

export function UsersStats() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const users = await getUsers()
        
        setStats({
          total: users.length,
          active: users.filter(user => user.status === 'active').length || users.length, // asumiendo que todos son activos si no hay status
          inactive: users.filter(user => user.status === 'inactive').length || 0,
          admins: users.filter(user => user.role === 'admin').length || 0
        })
      } catch (error) {
        console.error('Error al cargar estadísticas:', error)
      }
    }

    loadStats()
  }, [])

  const statsData = [
    {
      title: "Total Usuarios",
      value: stats.total.toString(),
      description: `${stats.total} usuarios registrados`,
      icon: Users,
    },
    {
      title: "Usuarios Activos",
      value: stats.active.toString(),
      description: `${((stats.active / stats.total) * 100).toFixed(1)}% del total`,
      icon: UserCheck,
    },
    {
      title: "Usuarios Inactivos",
      value: stats.inactive.toString(),
      description: `${((stats.inactive / stats.total) * 100).toFixed(1)}% del total`,
      icon: UserX,
    },
    {
      title: "Administradores",
      value: stats.admins.toString(),
      description: `${((stats.admins / stats.total) * 100).toFixed(1)}% del total`,
      icon: Shield,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
