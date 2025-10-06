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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import type { Permission } from "@/services/permissionService"

interface EditPermissionDialogProps {
  permission: Permission | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (permission: Permission) => Promise<void>
}

export function EditPermissionDialog({ permission, open, onOpenChange, onSave }: EditPermissionDialogProps) {
  const [formData, setFormData] = useState({
    url: "",
    method: "GET" as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const methods = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
    { value: "PATCH", label: "PATCH" },
  ]

  useEffect(() => {
    if (permission) {
      setFormData({
        url: permission.url,
        method: permission.method,
      })
    }
  }, [permission])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (permission) {
      try {
        setIsLoading(true)
        setError("")
        const updatedPermission = {
          ...permission,
          ...formData,
        }
        await onSave(updatedPermission)
        onOpenChange(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido")
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!permission) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Permiso</DialogTitle>
          <DialogDescription>Modifica la información del permiso seleccionado.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-url">URL</Label>
            <Input
              id="edit-url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="/api/example"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-method">Método HTTP</Label>
            <Select
              value={formData.method}
              onValueChange={(value: "GET" | "POST" | "PUT" | "DELETE" | "PATCH") =>
                setFormData({ ...formData, method: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar método" />
              </SelectTrigger>
              <SelectContent>
                {methods.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
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
