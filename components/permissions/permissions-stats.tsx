"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Shield, Lock, Unlock, Globe } from "lucide-react"
import { getPermissions } from "@/services/permissionService"

export function PermissionsStats() {
  const [stats, setStats] = useState({
    total: 0,
    get: 0,
    post: 0,
    other: 0,
  })

  useEffect(() => {
    const loadStats = async () => {
      try {
        const permissions = await getPermissions()

        const total = permissions.length
        const get = permissions.filter((p) => p.method === "GET").length || 0
        const post = permissions.filter((p) => p.method === "POST").length || 0
        const other = total - get - post

        setStats({ total, get, post, other })
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
      }
    }

    loadStats()
  }, [])

  const getPercentage = (value: number) => (stats.total > 0 ? ((value / stats.total) * 100).toFixed(1) : "0.0")

  const statsData = [
    {
      title: "Total Permisos",
      value: stats.total.toString(),
      description: `${stats.total} permisos registrados`,
      icon: Shield,
    },
    {
      title: "Métodos GET",
      value: stats.get.toString(),
      description: `${getPercentage(stats.get)}% del total`,
      icon: Unlock,
    },
    {
      title: "Métodos POST",
      value: stats.post.toString(),
      description: `${getPercentage(stats.post)}% del total`,
      icon: Lock,
    },
    {
      title: "Otros Métodos",
      value: stats.other.toString(),
      description: `${getPercentage(stats.other)}% del total`,
      icon: Globe,
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
