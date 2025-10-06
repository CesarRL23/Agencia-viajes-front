"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Label } from "@/components/users/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/users/ui/select"

import type { User } from "@/services/userService"

interface EditUserDialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (user: User) => Promise<void>
}

export function EditUserDialog({ user, open, onOpenChange, onSave }: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "active" as "active" | "inactive",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const roles = [
    { value: "Administrador", label: "Administrador" },
    { value: "Agente de Viajes", label: "Agente de Viajes" },
    { value: "Guía Turístico", label: "Guía Turístico" },
    { value: "Admin Hotel", label: "Admin Hotel" },
    { value: "Cliente", label: "Cliente" },
  ]

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: (user as any).role ?? "",
        status: (user as any).status ?? "active",
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (user) {
      try {
        setIsLoading(true)
        setError("")
        const updatedUser = {
          ...user,
          ...formData,
        }
        await onSave(updatedUser)
        onOpenChange(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>Modifica la información del usuario seleccionado.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nombre Completo</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Correo Electrónico</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-role">Rol</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
