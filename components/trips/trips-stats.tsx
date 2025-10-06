import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Plane, MapPin, Clock, DollarSign } from "lucide-react"

export function TripsStats() {
  const stats = [
    {
      title: "Viajes Activos",
      value: "24",
      description: "+3 esta semana",
      icon: Plane,
      color: "text-blue-600",
    },
    {
      title: "Destinos",
      value: "18",
      description: "12 nacionales, 6 internacionales",
      icon: MapPin,
      color: "text-green-600",
    },
    {
      title: "Duración Promedio",
      value: "5.2 días",
      description: "+0.3 días vs mes anterior",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Valor Promedio",
      value: "$2,450",
      description: "+15% vs mes anterior",
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
