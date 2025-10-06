"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPermission } from "@/services/permissionService"
import { Plus } from "lucide-react"

interface CreatePermissionDialogProps {
  onSuccess?: () => void
}

export function CreatePermissionDialog({ onSuccess }: CreatePermissionDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    url: "",
    method: "GET" as "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  })

  const methods = [
    { value: "GET", label: "GET" },
    { value: "POST", label: "POST" },
    { value: "PUT", label: "PUT" },
    { value: "DELETE", label: "DELETE" },
    { value: "PATCH", label: "PATCH" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createPermission(formData)
      setFormData({ url: "", method: "GET" })
      setOpen(false)
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error al crear permiso:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Permiso
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Permiso</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="/api/example"
                required
              />
            </div>
            <div>
              <Label htmlFor="method">Método HTTP</Label>
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
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Permiso"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
