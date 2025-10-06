import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Plane, Users, MapPin, DollarSign } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Viajes Activos",
      value: "24",
      description: "+12% desde el mes pasado",
      icon: Plane,
    },
    {
      title: "Clientes",
      value: "156",
      description: "+8% desde el mes pasado",
      icon: Users,
    },
    {
      title: "Destinos",
      value: "18",
      description: "+2 nuevos destinos",
      icon: MapPin,
    },
    {
      title: "Ingresos",
      value: "$45,231",
      description: "+20% desde el mes pasado",
      icon: DollarSign,
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
