"use client"

import { useState } from "react"
import { Button } from "@/components/users/ui/button"
import { Input } from "@/components/users/ui/input"
import { Label } from "@/components/users/ui/label"
import { Textarea } from "@/components/users/ui/textarea"
import { type Role } from "@/services/roleService"

interface RolesFormProps {
  initialData?: Partial<Role>
  onSubmit: (role: Role) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  submitText?: string
  title?: string
}

export function RolesForm({
  initialData = {},
  onSubmit,
  onCancel,
  isLoading = false,
  submitText = "Guardar",
  title = "Formulario de Rol"
}: RolesFormProps) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del rol es requerido"
    } else if (formData.name.length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida"
    } else if (formData.description.length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const roleData: Role = {
      ...initialData,
      name: formData.name.trim(),
      description: formData.description.trim(),
    }

    await onSubmit(roleData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      <div className="grid gap-4">
        <div>
          <Label htmlFor="name">Nombre del Rol</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Ej: Administrador, Usuario, Editor"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe las responsabilidades y permisos de este rol"
            rows={3}
            className={errors.description ? "border-destructive" : ""}
          />
          {errors.description && (
            <p className="text-sm text-destructive mt-1">{errors.description}</p>
          )}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : submitText}
        </Button>
      </div>
    </form>
  )
}
