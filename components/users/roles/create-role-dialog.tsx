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
} from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Label } from "@/components/users/ui/label"
import { Textarea } from "@/components/users/ui/textarea"
import { Checkbox } from "@/components/users/ui/checkbox"
import { Badge } from "@/components/users/ui/badge"

interface CreateRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const permissions = [
  { id: "users.create", name: "Crear Usuarios", category: "Usuarios" },
  { id: "users.read", name: "Ver Usuarios", category: "Usuarios" },
  { id: "users.update", name: "Editar Usuarios", category: "Usuarios" },
  { id: "users.delete", name: "Eliminar Usuarios", category: "Usuarios" },
  { id: "trips.create", name: "Crear Viajes", category: "Viajes" },
  { id: "trips.read", name: "Ver Viajes", category: "Viajes" },
  { id: "trips.update", name: "Editar Viajes", category: "Viajes" },
  { id: "trips.delete", name: "Eliminar Viajes", category: "Viajes" },
  { id: "accommodation.create", name: "Crear Hospedaje", category: "Hospedaje" },
  { id: "accommodation.read", name: "Ver Hospedaje", category: "Hospedaje" },
  { id: "accommodation.update", name: "Editar Hospedaje", category: "Hospedaje" },
  { id: "accommodation.delete", name: "Eliminar Hospedaje", category: "Hospedaje" },
  { id: "payments.read", name: "Ver Pagos", category: "Pagos" },
  { id: "payments.process", name: "Procesar Pagos", category: "Pagos" },
  { id: "messages.read", name: "Ver Mensajes", category: "Comunicación" },
  { id: "messages.create", name: "Enviar Mensajes", category: "Comunicación" },
  { id: "reports.read", name: "Ver Reportes", category: "Reportes" },
]

const categories = [...new Set(permissions.map((p) => p.category))]

export function CreateRoleDialog({ open, onOpenChange }: CreateRoleDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId],
      })
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((p) => p !== permissionId),
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Creating role:", formData)
    onOpenChange(false)
    setFormData({
      name: "",
      description: "",
      permissions: [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
          <DialogDescription>Define un nuevo rol y asigna los permisos correspondientes.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="role-name">Nombre del Rol</Label>
            <Input
              id="role-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Supervisor de Ventas"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-description">Descripción</Label>
            <Textarea
              id="role-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe las responsabilidades de este rol..."
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Permisos</Label>
            {categories.map((category) => (
              <div key={category} className="space-y-3">
                <Badge variant="outline">{category}</Badge>
                <div className="space-y-2 pl-4">
                  {permissions
                    .filter((p) => p.category === category)
                    .map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={`create-${permission.id}`}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        />
                        <Label
                          htmlFor={`create-${permission.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Crear Rol</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
