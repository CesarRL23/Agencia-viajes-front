import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Hotel, Bed, Calendar, DollarSign } from "lucide-react"

export function AccommodationStats() {
  const stats = [
    {
      title: "Reservas Activas",
      value: "48",
      description: "+8 esta semana",
      icon: Hotel,
      color: "text-blue-600",
    },
    {
      title: "Habitaciones Ocupadas",
      value: "156",
      description: "78% ocupación",
      icon: Bed,
      color: "text-green-600",
    },
    {
      title: "Check-ins Hoy",
      value: "12",
      description: "8 completados",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      title: "Ingresos Hospedaje",
      value: "$18,450",
      description: "+22% vs mes anterior",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
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
