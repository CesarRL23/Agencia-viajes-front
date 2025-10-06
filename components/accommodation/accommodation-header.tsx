"use client"

import { Button } from "@/components/users/ui/button"
import { Plus, Building, Calendar } from "lucide-react"
import { useState } from "react"
import { CreateReservationDialog } from "./create-reservation-dialog"

export function AccommodationHeader() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Hospedaje</h2>
          <p className="text-muted-foreground">Administra reservas de hoteles y hospedajes asociados</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard/accommodation/hotels")}>
            <Building className="mr-2 h-4 w-4" />
            Hoteles
          </Button>
          <Button variant="outline" onClick={() => (window.location.href = "/dashboard/accommodation/calendar")}>
            <Calendar className="mr-2 h-4 w-4" />
            Calendario
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Reserva
          </Button>
        </div>
      </div>

      <CreateReservationDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </>
  )
}
