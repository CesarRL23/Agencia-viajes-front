"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/users/ui/dialog"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Label } from "@/components/users/ui/label"
import { Textarea } from "@/components/users/ui/textarea"
import { createRole } from "@/services/roleService"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateRoleDialogProps {
  onRoleCreated?: () => void
}

export function CreateRoleDialog({ onRoleCreated }: CreateRoleDialogProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createRole(formData)
      await onRoleCreated?.()
      setFormData({ name: "", description: "" })
      setOpen(false)
      toast({
        title: "Rol creado",
        description: `El rol ${formData.name} ha sido creado exitosamente.`,
      })
    } catch (error: any) {
      console.error("Error al crear rol:", error)
      toast({
        title: "Error al crear rol",
        description: error.message || "No se pudo crear el rol. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Rol
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Rol</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Nombre del Rol</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Administrador, Usuario, Editor"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe las responsabilidades y permisos de este rol"
                rows={3}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Rol"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
