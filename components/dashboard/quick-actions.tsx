"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Button } from "@/components/users/ui/button"
import { Plus, Calendar, Users, MapPin } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "Nuevo Viaje",
      description: "Crear un nuevo itinerario de viaje",
      icon: Plus,
      href: "/trips/new",
    },
    {
      title: "Agendar Cita",
      description: "Programar reunión con cliente",
      icon: Calendar,
      href: "/appointments/new",
    },
    {
      title: "Gestionar Usuarios",
      description: "Administrar usuarios y roles",
      icon: Users,
      href: "/users",
    },
    {
      title: "Ver Destinos",
      description: "Explorar destinos disponibles",
      icon: MapPin,
      href: "/destinations",
    },
  ]

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Accede rápidamente a las funciones más utilizadas</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto p-4 justify-start bg-transparent"
            onClick={() => (window.location.href = action.href)}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
