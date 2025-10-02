"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Bolt as Boat, Plane, MapPin, Clock, Phone } from "lucide-react"

interface VehicleStatusProps {
  tripId: string
}

export function VehicleStatus({ tripId }: VehicleStatusProps) {
  const vehicles = [
    {
      id: "bus-001",
      name: "Bus Principal",
      type: "bus",
      driver: "Carlos Mendoza",
      phone: "+57 300 123 4567",
      status: "moving",
      location: "Cartagena Centro",
      speed: 45,
      fuel: 75,
      passengers: 12,
      lastUpdate: "2024-01-15 14:30:00",
    },
    {
      id: "boat-001",
      name: "Lancha Rosario",
      type: "boat",
      driver: "Miguel Torres",
      phone: "+57 301 234 5678",
      status: "stopped",
      location: "Muelle La Bodeguita",
      speed: 0,
      fuel: 90,
      passengers: 8,
      lastUpdate: "2024-01-15 14:28:00",
    },
  ]

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "bus":
        return <Car className="h-4 w-4" />
      case "boat":
        return <Boat className="h-4 w-4" />
      case "plane":
        return <Plane className="h-4 w-4" />
      default:
        return <Car className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "stopped":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "offline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "moving":
        return "En movimiento"
      case "stopped":
        return "Detenido"
      case "offline":
        return "Sin señal"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado de Vehículos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getVehicleIcon(vehicle.type)}
                <span className="font-medium">{vehicle.name}</span>
              </div>
              <Badge className={getStatusColor(vehicle.status)}>{getStatusText(vehicle.status)}</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Conductor:</span>
                <span>{vehicle.driver}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pasajeros:</span>
                <span>{vehicle.passengers}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Velocidad:</span>
                <span>{vehicle.speed} km/h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Combustible:</span>
                <span>{vehicle.fuel}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{vehicle.location}</span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Actualizado: {new Date(vehicle.lastUpdate).toLocaleTimeString("es-CO")}</span>
            </div>

            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Phone className="mr-2 h-3 w-3" />
              Contactar Conductor
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
