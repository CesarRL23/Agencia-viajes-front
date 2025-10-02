"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface CreateReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateReservationDialog({ open, onOpenChange }: CreateReservationDialogProps) {
  const [formData, setFormData] = useState({
    guestName: "",
    hotel: "",
    roomType: "",
    guests: "",
    checkIn: undefined as Date | undefined,
    checkOut: undefined as Date | undefined,
    trip: "",
    specialRequests: "",
  })

  const hotels = [
    { value: "casa-arzobispado", label: "Hotel Boutique Casa del Arzobispado" },
    { value: "las-americas", label: "Hotel Las Américas" },
    { value: "decameron", label: "Decameron Cartagena" },
    { value: "santa-clara", label: "Hotel Santa Clara" },
    { value: "caribe", label: "Hotel Caribe" },
  ]

  const roomTypes = [
    { value: "standard", label: "Habitación Estándar" },
    { value: "double", label: "Habitación Doble" },
    { value: "triple", label: "Habitación Triple" },
    { value: "junior-suite", label: "Junior Suite" },
    { value: "suite-deluxe", label: "Suite Deluxe" },
  ]

  const trips = [
    { value: "cartagena", label: "Aventura en Cartagena" },
    { value: "amazonas", label: "Expedición Amazónica" },
    { value: "europa", label: "Tour Europeo" },
    { value: "cafe", label: "Ruta del Café" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating reservation:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      guestName: "",
      hotel: "",
      roomType: "",
      guests: "",
      checkIn: undefined,
      checkOut: undefined,
      trip: "",
      specialRequests: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Reserva de Hospedaje</DialogTitle>
          <DialogDescription>Completa la información para crear una nueva reserva.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guest-name">Nombre del Huésped</Label>
              <Input
                id="guest-name"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="Nombre completo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Número de Huéspedes</Label>
              <Input
                id="guests"
                type="number"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                placeholder="1"
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hotel">Hotel</Label>
              <Select value={formData.hotel} onValueChange={(value) => setFormData({ ...formData, hotel: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un hotel" />
                </SelectTrigger>
                <SelectContent>
                  {hotels.map((hotel) => (
                    <SelectItem key={hotel.value} value={hotel.value}>
                      {hotel.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="room-type">Tipo de Habitación</Label>
              <Select
                value={formData.roomType}
                onValueChange={(value) => setFormData({ ...formData, roomType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo" />
                </SelectTrigger>
                <SelectContent>
                  {roomTypes.map((room) => (
                    <SelectItem key={room.value} value={room.value}>
                      {room.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fecha de Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.checkIn ? format(formData.checkIn, "PPP", { locale: es }) : <span>Selecciona fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.checkIn}
                    onSelect={(date) => setFormData({ ...formData, checkIn: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Fecha de Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.checkOut ? (
                      format(formData.checkOut, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.checkOut}
                    onSelect={(date) => setFormData({ ...formData, checkOut: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="trip">Viaje Asociado (Opcional)</Label>
            <Select value={formData.trip} onValueChange={(value) => setFormData({ ...formData, trip: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un viaje" />
              </SelectTrigger>
              <SelectContent>
                {trips.map((trip) => (
                  <SelectItem key={trip.value} value={trip.value}>
                    {trip.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Reserva</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
