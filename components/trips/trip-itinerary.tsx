"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, Plane, Car, Clock } from "lucide-react"
import { useState } from "react"

interface TripItineraryProps {
  tripId: string
}

interface ItineraryItem {
  id: string
  day: number
  time: string
  title: string
  description: string
  location: string
  type: "flight" | "ground" | "activity" | "accommodation"
  provider?: string
  vehicle?: string
}

export function TripItinerary({ tripId }: TripItineraryProps) {
  const [itinerary] = useState<ItineraryItem[]>([
    {
      id: "1",
      day: 1,
      time: "06:00",
      title: "Vuelo Bogotá - Cartagena",
      description: "Salida desde el Aeropuerto El Dorado",
      location: "Aeropuerto El Dorado",
      type: "flight",
      provider: "Avianca",
      vehicle: "Airbus A320",
    },
    {
      id: "2",
      day: 1,
      time: "08:30",
      title: "Llegada a Cartagena",
      description: "Recepción en el aeropuerto y traslado al hotel",
      location: "Aeropuerto Rafael Núñez",
      type: "ground",
      provider: "TransCaribe",
      vehicle: "Bus turístico",
    },
    {
      id: "3",
      day: 1,
      time: "10:00",
      title: "Check-in Hotel",
      description: "Registro en el hotel y tiempo libre",
      location: "Hotel Boutique Casa del Arzobispado",
      type: "accommodation",
    },
    {
      id: "4",
      day: 1,
      time: "15:00",
      title: "Tour Ciudad Amurallada",
      description: "Recorrido por el centro histórico de Cartagena",
      location: "Centro Histórico",
      type: "activity",
    },
    {
      id: "5",
      day: 2,
      time: "09:00",
      title: "Islas del Rosario",
      description: "Excursión en lancha a las Islas del Rosario",
      location: "Muelle La Bodeguita",
      type: "activity",
      provider: "Turismo Rosario",
      vehicle: "Lancha rápida",
    },
  ])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "ground":
        return <Car className="h-4 w-4" />
      case "activity":
        return <MapPin className="h-4 w-4" />
      case "accommodation":
        return <Clock className="h-4 w-4" />
      default:
        return <MapPin className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flight":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "ground":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "activity":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "accommodation":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "flight":
        return "Vuelo"
      case "ground":
        return "Transporte"
      case "activity":
        return "Actividad"
      case "accommodation":
        return "Hospedaje"
      default:
        return type
    }
  }

  const groupedItinerary = itinerary.reduce(
    (acc, item) => {
      if (!acc[item.day]) {
        acc[item.day] = []
      }
      acc[item.day].push(item)
      return acc
    },
    {} as Record<number, ItineraryItem[]>,
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Itinerario del Viaje</CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Actividad
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedItinerary).map(([day, items]) => (
          <div key={day} className="space-y-4">
            <h3 className="text-lg font-semibold">Día {day}</h3>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-full ${getTypeColor(item.type)}`}>{getTypeIcon(item.type)}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-medium">{item.title}</h4>
                        <Badge className={getTypeColor(item.type)}>{getTypeLabel(item.type)}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {item.location}
                      </div>
                      {item.provider && <div>Proveedor: {item.provider}</div>}
                      {item.vehicle && <div>Vehículo: {item.vehicle}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
