"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Button } from "@/components/users/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/users/ui/avatar"
import { Badge } from "@/components/users/ui/badge"
import { Plus, Phone, Mail } from "lucide-react"

interface TripParticipantsProps {
  tripId: string
}

interface Participant {
  id: string
  name: string
  email: string
  phone: string
  status: "confirmed" | "pending" | "cancelled"
  avatar?: string
}

export function TripParticipants({ tripId }: TripParticipantsProps) {
  const participants: Participant[] = [
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@email.com",
      phone: "+57 300 123 4567",
      status: "confirmed",
      avatar: "/man.jpg",
    },
    {
      id: "2",
      name: "María García",
      email: "maria@email.com",
      phone: "+57 301 234 5678",
      status: "confirmed",
      avatar: "/diverse-woman-portrait.png",
    },
    {
      id: "3",
      name: "Carlos López",
      email: "carlos@email.com",
      phone: "+57 302 345 6789",
      status: "pending",
    },
    {
      id: "4",
      name: "Ana Rodríguez",
      email: "ana@email.com",
      phone: "+57 303 456 7890",
      status: "confirmed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Participantes</CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Agregar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center space-x-3 p-3 border rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
              <AvatarFallback>
                {participant.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium truncate">{participant.name}</h4>
                <Badge className={getStatusColor(participant.status)}>{getStatusText(participant.status)}</Badge>
              </div>
              <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span className="truncate">{participant.email}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                <Phone className="h-3 w-3" />
                <span>{participant.phone}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="text-center text-sm text-muted-foreground pt-2 border-t">
          {participants.length} de 15 participantes
        </div>
      </CardContent>
    </Card>
  )
}
