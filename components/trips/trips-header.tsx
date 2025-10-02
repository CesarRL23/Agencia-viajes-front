"use client"

import { Button } from "@/components/ui/button"
import { Plus, Map, Calendar } from "lucide-react"
import { useState } from "react"
import { CreateTripDialog } from "./create-trip-dialog"

export function TripsHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Viajes</h2>
          <p className="text-muted-foreground">Administra viajes, itinerarios y seguimiento en tiempo real</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard/trips/map")}>
            <Map className="mr-2 h-4 w-4" />
            Ver Mapa
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard/trips/calendar")}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendario
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Viaje
          </Button>
        </div>
      </div>

      <CreateTripDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
