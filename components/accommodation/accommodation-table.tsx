"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/users/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/users/ui/card"
import { Button } from "@/components/users/ui/button"
import { Badge } from "@/components/users/ui/badge"
import { Input } from "@/components/users/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/users/ui/dropdown-menu"
import { MoreHorizontal, Search, Edit, Eye, Hotel, Users, Calendar } from "lucide-react"

interface Reservation {
  id: string
  guestName: string
  hotel: string
  roomType: string
  checkIn: string
  checkOut: string
  guests: number
  status: "confirmed" | "pending" | "checked-in" | "checked-out" | "cancelled"
  totalAmount: number
  trip?: string
}

const mockReservations: Reservation[] = [
  {
    id: "1",
    guestName: "Juan Pérez",
    hotel: "Hotel Boutique Casa del Arzobispado",
    roomType: "Suite Deluxe",
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    guests: 2,
    status: "confirmed",
    totalAmount: 850000,
    trip: "Aventura en Cartagena",
  },
  {
    id: "2",
    guestName: "María García",
    hotel: "Hotel Las Américas",
    roomType: "Habitación Estándar",
    checkIn: "2024-02-16",
    checkOut: "2024-02-18",
    guests: 1,
    status: "checked-in",
    totalAmount: 320000,
    trip: "Aventura en Cartagena",
  },
  {
    id: "3",
    guestName: "Carlos López",
    hotel: "Decameron Cartagena",
    roomType: "Habitación Doble",
    checkIn: "2024-02-20",
    checkOut: "2024-02-25",
    guests: 2,
    status: "pending",
    totalAmount: 650000,
  },
  {
    id: "4",
    guestName: "Ana Rodríguez",
    hotel: "Hotel Santa Clara",
    roomType: "Junior Suite",
    checkIn: "2024-01-28",
    checkOut: "2024-02-02",
    guests: 2,
    status: "checked-out",
    totalAmount: 1200000,
    trip: "Tour Histórico",
  },
  {
    id: "5",
    guestName: "Luis Martínez",
    hotel: "Hotel Caribe",
    roomType: "Habitación Triple",
    checkIn: "2024-02-22",
    checkOut: "2024-02-26",
    guests: 3,
    status: "confirmed",
    totalAmount: 780000,
    trip: "Expedición Amazónica",
  },
]

export function AccommodationTable() {
  const [reservations] = useState<Reservation[]>(mockReservations)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.roomType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "checked-in":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "checked-out":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmada"
      case "pending":
        return "Pendiente"
      case "checked-in":
        return "Check-in"
      case "checked-out":
        return "Check-out"
      case "cancelled":
        return "Cancelada"
      default:
        return status
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
          <CardTitle>Reservas de Hospedaje</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar reservas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Huésped</TableHead>
              <TableHead>Hotel</TableHead>
              <TableHead>Fechas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Huéspedes</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{reservation.guestName}</div>
                    {reservation.trip && <div className="text-sm text-muted-foreground">Viaje: {reservation.trip}</div>}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium flex items-center">
                      <Hotel className="h-3 w-3 mr-1" />
                      {reservation.hotel}
                    </div>
                    <div className="text-sm text-muted-foreground">{reservation.roomType}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(reservation.checkIn).toLocaleDateString("es-CO")}
                    </div>
                    <div className="text-muted-foreground">
                      al {new Date(reservation.checkOut).toLocaleDateString("es-CO")}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(reservation.status)}>{getStatusText(reservation.status)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    {reservation.guests}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(reservation.totalAmount)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => (window.location.href = `/dashboard/accommodation/${reservation.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => (window.location.href = `/dashboard/accommodation/${reservation.id}/edit`)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Check-in</DropdownMenuItem>
                      <DropdownMenuItem>Check-out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
