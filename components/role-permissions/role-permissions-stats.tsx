"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Shield, Key, Link2 } from "lucide-react"
import { getRoles, getPermissions } from "@/services/rolePermissionService"

export function RolePermissionsStats() {
  const [stats, setStats] = useState({
    totalRoles: 0,
    totalPermissions: 0,
    totalAssociations: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        console.log("[v0] Loading stats...")
        const [rolesData, permissionsData] = await Promise.all([getRoles(), getPermissions()])

        console.log("[v0] Stats loaded successfully:", {
          roles: rolesData.length,
          permissions: permissionsData.length,
        })

        setStats({
          totalRoles: rolesData.length,
          totalPermissions: permissionsData.length,
          totalAssociations: 0, // This would need a separate endpoint
        })
      } catch (error) {
        console.error("[v0] Error al cargar estadísticas:", error)
      }
    }

    loadStats()
  }, [])

  const statsData = [
    {
      title: "Total Roles",
      value: stats.totalRoles.toString(),
      description: `${stats.totalRoles} roles registrados`,
      icon: Shield,
    },
    {
      title: "Total Permisos",
      value: stats.totalPermissions.toString(),
      description: `${stats.totalPermissions} permisos disponibles`,
      icon: Key,
    },
    {
      title: "Asociaciones",
      value: stats.totalAssociations.toString(),
      description: "Permisos asignados a roles",
      icon: Link2,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
