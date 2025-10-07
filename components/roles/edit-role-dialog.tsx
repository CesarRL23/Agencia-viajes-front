"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Label } from "@/components/users/ui/label"
import { Textarea } from "@/components/users/ui/textarea"
import { type Role } from "@/services/roleService"
import { useToast } from "@/hooks/use-toast"

interface EditRoleDialogProps {
  role: Role | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (role: Role) => Promise<void>
}

export function EditRoleDialog({ role, open, onOpenChange, onSave }: EditRoleDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  // Actualizar el formulario cuando cambie el rol
  useEffect(() => {
    if (role) {
      setFormData({
        name: role.name || "",
        description: role.description || "",
      })
    }
  }, [role])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role?._id) return

    setIsLoading(true)
    try {
      const updatedRole: Role = {
        ...role,
        name: formData.name,
        description: formData.description,
      }
      await onSave(updatedRole)
      onOpenChange(false)
      toast({
        title: "Rol actualizado",
        description: `El rol ${formData.name} ha sido actualizado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al actualizar rol:", error)
      toast({
        title: "Error al actualizar rol",
        description: error.message || "No se pudo actualizar el rol. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Rol</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="edit-name">Nombre del Rol</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Administrador, Usuario, Editor"
                required
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Descripción</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe las responsabilidades y permisos de este rol"
                rows={3}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar Rol"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
