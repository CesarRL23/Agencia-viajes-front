"use client"

import { Button } from "@/components/users/ui/button"
import { ArrowLeft, Edit, MapPin, MessageSquare, Share } from "lucide-react"

interface TripActionsProps {
  tripId: string
}

export function TripActions({ tripId }: TripActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={() => window.history.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => (window.location.href = `/dashboard/trips/${tripId}/tracking`)}>
          <MapPin className="mr-2 h-4 w-4" />
          Seguimiento GPS
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = `/dashboard/messages?trip=${tripId}`)}>
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat Grupal
        </Button>
        <Button variant="outline">
          <Share className="mr-2 h-4 w-4" />
          Compartir
        </Button>
        <Button onClick={() => (window.location.href = `/dashboard/trips/${tripId}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar Viaje
        </Button>
      </div>
    </div>
  )
}
