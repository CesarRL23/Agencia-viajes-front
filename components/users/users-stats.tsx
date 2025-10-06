"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield } from "lucide-react"
import { getUsers, type User } from "@/services/userService"

export function UsersStats() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    admins: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const users = await getUsers()

        // Aquí puedes ajustar según tu modelo
        const total = users.length
        const active = users.filter(u => u.active === true).length || 0
        const admins = users.filter(u => u.role === "ADMIN").length || 0
        const inactive = total - active

        setStats({ total, active, inactive, admins })
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
      }
    }

    loadStats()
  }, [])

  const getPercentage = (value: number) =>
    stats.total > 0 ? ((value / stats.total) * 100).toFixed(1) : "0.0"

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
      description: `${getPercentage(stats.active)}% del total`,
      icon: UserCheck,
    },
    {
      title: "Usuarios Inactivos",
      value: stats.inactive.toString(),
      description: `${getPercentage(stats.inactive)}% del total`,
      icon: UserX,
    },
    {
      title: "Administradores",
      value: stats.admins.toString(),
      description: `${getPercentage(stats.admins)}% del total`,
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
