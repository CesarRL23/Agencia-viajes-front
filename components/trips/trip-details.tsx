"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, DollarSign, User } from "lucide-react"

interface TripDetailsProps {
  tripId: string
}

export function TripDetails({ tripId }: TripDetailsProps) {
  // Mock data - in real app, fetch based on tripId
  const trip = {
    id: tripId,
    name: "Aventura en Cartagena",
    description:
      "Descubre la magia de Cartagena con este increíble viaje que incluye tours por la ciudad amurallada, playas paradisíacas y experiencias gastronómicas únicas.",
    destination: "Cartagena, Colombia",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    status: "active",
    participants: 12,
    maxParticipants: 15,
    guide: "Ana Martínez",
    price: 1850000,
    type: "nacional",
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{trip.name}</CardTitle>
          <Badge className={getStatusColor(trip.status)}>{trip.status === "active" ? "Activo" : trip.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">{trip.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Destino</p>
              <p className="text-sm text-muted-foreground">{trip.destination}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Fechas</p>
              <p className="text-sm text-muted-foreground">
                {new Date(trip.startDate).toLocaleDateString("es-CO")} -{" "}
                {new Date(trip.endDate).toLocaleDateString("es-CO")}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Participantes</p>
              <p className="text-sm text-muted-foreground">
                {trip.participants}/{trip.maxParticipants}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Precio</p>
              <p className="text-sm text-muted-foreground">{formatPrice(trip.price)}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Guía Asignado</p>
            <p className="text-sm text-muted-foreground">{trip.guide}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
