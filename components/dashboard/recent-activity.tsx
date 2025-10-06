import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/users/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      user: "María González",
      action: "creó un nuevo viaje a Cartagena",
      time: "hace 2 horas",
      avatar: "/diverse-woman-portrait.png",
    },
    {
      user: "Carlos Rodríguez",
      action: "confirmó reserva de hotel",
      time: "hace 4 horas",
      avatar: "/man.jpg",
    },
    {
      user: "Ana Martínez",
      action: "procesó pago de cliente",
      time: "hace 6 horas",
      avatar: "/diverse-woman-portrait.png",
    },
    {
      user: "Luis Pérez",
      action: "actualizó itinerario de viaje",
      time: "hace 8 horas",
      avatar: "/man.jpg",
    },
  ]

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                <AvatarFallback>
                  {activity.user
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="ml-auto font-medium text-sm text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
