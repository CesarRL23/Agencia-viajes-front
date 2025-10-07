"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Shield, Users, UserCheck, UserX } from "lucide-react"
import { getRoles, getUserRoles, type Role, type UserRole } from "@/services/roleService"
import { getUsers, type User } from "@/services/userService"

export function RolesStats() {
  const [stats, setStats] = useState({
    totalRoles: 0,
    totalUsers: 0,
    usersWithRoles: 0,
    usersWithoutRoles: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [roles, users, userRoles] = await Promise.all([
          getRoles(),
          getUsers(),
          getUserRoles()
        ])

        const totalRoles = roles.length
        const totalUsers = users.length
        const usersWithRoles = new Set(userRoles.map(ur => ur.userId)).size
        const usersWithoutRoles = totalUsers - usersWithRoles

        setStats({ totalRoles, totalUsers, usersWithRoles, usersWithoutRoles })
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
      }
    }

    loadStats()
  }, [])

  const getPercentage = (value: number, total: number) =>
    total > 0 ? ((value / total) * 100).toFixed(1) : "0.0"

  const statsData = [
    {
      title: "Total Roles",
      value: stats.totalRoles.toString(),
      description: `${stats.totalRoles} roles definidos`,
      icon: Shield,
    },
    {
      title: "Total Usuarios",
      value: stats.totalUsers.toString(),
      description: `${stats.totalUsers} usuarios registrados`,
      icon: Users,
    },
    {
      title: "Usuarios con Roles",
      value: stats.usersWithRoles.toString(),
      description: `${getPercentage(stats.usersWithRoles, stats.totalUsers)}% del total`,
      icon: UserCheck,
    },
    {
      title: "Usuarios sin Roles",
      value: stats.usersWithoutRoles.toString(),
      description: `${getPercentage(stats.usersWithoutRoles, stats.totalUsers)}% del total`,
      icon: UserX,
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
