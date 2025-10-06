"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { MapPin, Navigation } from "lucide-react"

interface TripTrackingMapProps {
  tripId: string
}

export function TripTrackingMap({ tripId }: TripTrackingMapProps) {
  // Mock GPS data
  const vehicles = [
    {
      id: "bus-001",
      name: "Bus Principal",
      type: "bus",
      status: "moving",
      location: "Cartagena Centro",
      coordinates: { lat: 10.4236, lng: -75.5378 },
      speed: 45,
      lastUpdate: "2024-01-15 14:30:00",
    },
    {
      id: "boat-001",
      name: "Lancha Rosario",
      type: "boat",
      status: "stopped",
      location: "Muelle La Bodeguita",
      coordinates: { lat: 10.4089, lng: -75.542 },
      speed: 0,
      lastUpdate: "2024-01-15 14:28:00",
    },
  ]

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Mapa de Seguimiento
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full">
        {/* Placeholder for map - In real implementation, use Leaflet or Google Maps */}
        <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 opacity-50"></div>

          {/* Mock map markers */}
          <div className="relative z-10 space-y-4">
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold mb-2">Mapa Interactivo</h3>
              <p className="text-sm text-muted-foreground">
                Integración con Leaflet/Google Maps para seguimiento en tiempo real
              </p>
            </div>

            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="absolute bg-white dark:bg-card p-3 rounded-lg shadow-lg border"
                style={{
                  left: `${20 + index * 200}px`,
                  top: `${100 + index * 150}px`,
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${vehicle.status === "moving" ? "bg-green-500" : "bg-yellow-500"}`}
                  ></div>
                  <span className="font-medium text-sm">{vehicle.name}</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center">
                    <Navigation className="h-3 w-3 mr-1" />
                    {vehicle.speed} km/h
                  </div>
                  <div>{vehicle.location}</div>
                  <div>Actualizado: {new Date(vehicle.lastUpdate).toLocaleTimeString("es-CO")}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 bg-white dark:bg-card p-2 rounded shadow">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                En movimiento
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
                Detenido
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                Sin señal
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
