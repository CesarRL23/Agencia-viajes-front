"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Edit, Eye, MapPin, Users, Calendar } from "lucide-react"

interface Trip {
  id: string
  name: string
  destination: string
  startDate: string
  endDate: string
  status: "planning" | "active" | "completed" | "cancelled"
  participants: number
  guide: string
  price: number
  type: "nacional" | "internacional"
}

const mockTrips: Trip[] = [
  {
    id: "1",
    name: "Aventura en Cartagena",
    destination: "Cartagena, Colombia",
    startDate: "2024-02-15",
    endDate: "2024-02-20",
    status: "active",
    participants: 12,
    guide: "Ana Martínez",
    price: 1850000,
    type: "nacional",
  },
  {
    id: "2",
    name: "Expedición Amazónica",
    destination: "Leticia, Amazonas",
    startDate: "2024-02-22",
    endDate: "2024-02-28",
    status: "planning",
    participants: 8,
    guide: "Carlos Rodríguez",
    price: 2450000,
    type: "nacional",
  },
  {
    id: "3",
    name: "Tour Europeo",
    destination: "París, Francia",
    startDate: "2024-03-10",
    endDate: "2024-03-20",
    status: "planning",
    participants: 15,
    guide: "María González",
    price: 8500000,
    type: "internacional",
  },
  {
    id: "4",
    name: "Ruta del Café",
    destination: "Eje Cafetero",
    startDate: "2024-01-20",
    endDate: "2024-01-25",
    status: "completed",
    participants: 10,
    guide: "Luis Pérez",
    price: 1200000,
    type: "nacional",
  },
  {
    id: "5",
    name: "Playa y Relax",
    destination: "San Andrés",
    startDate: "2024-02-05",
    endDate: "2024-02-10",
    status: "active",
    participants: 6,
    guide: "Sofia Herrera",
    price: 1650000,
    type: "nacional",
  },
]

export function TripsTable() {
  const [trips] = useState<Trip[]>(mockTrips)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTrips = trips.filter(
    (trip) =>
      trip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.guide.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "planning":
        return "Planificación"
      case "completed":
        return "Completado"
      case "cancelled":
        return "Cancelado"
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
          <CardTitle>Lista de Viajes</CardTitle>
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar viajes..."
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
              <TableHead>Viaje</TableHead>
              <TableHead>Fechas</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Participantes</TableHead>
              <TableHead>Guía</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrips.map((trip) => (
              <TableRow key={trip.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{trip.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {trip.destination}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(trip.startDate).toLocaleDateString("es-CO")}
                    </div>
                    <div className="text-muted-foreground">al {new Date(trip.endDate).toLocaleDateString("es-CO")}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(trip.status)}>{getStatusText(trip.status)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                    {trip.participants}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{trip.guide}</TableCell>
                <TableCell className="font-medium">{formatPrice(trip.price)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/trips/${trip.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/trips/${trip.id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => (window.location.href = `/dashboard/trips/${trip.id}/itinerary`)}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        Ver Itinerario
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => (window.location.href = `/dashboard/trips/${trip.id}/tracking`)}>
                        <MapPin className="mr-2 h-4 w-4" />
                        Seguimiento GPS
                      </DropdownMenuItem>
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
