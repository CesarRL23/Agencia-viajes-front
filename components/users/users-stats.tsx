import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Shield } from "lucide-react"

export function UsersStats() {
  const stats = [
    {
      title: "Total Usuarios",
      value: "156",
      description: "+12 este mes",
      icon: Users,
    },
    {
      title: "Usuarios Activos",
      value: "142",
      description: "91% del total",
      icon: UserCheck,
    },
    {
      title: "Usuarios Inactivos",
      value: "14",
      description: "9% del total",
      icon: UserX,
    },
    {
      title: "Administradores",
      value: "8",
      description: "5% del total",
      icon: Shield,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
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
